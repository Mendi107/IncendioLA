<#
    comprimir.ps1 — comprime en lote los vídeos del incendio para la web.

    Uso (desde D:\IncendioLA, en PowerShell):
        .\comprimir.ps1

    Lee todo lo que haya en .\originales y escribe los .mp4 listos en .\videos
    Los originales NO se tocan.

    Requiere ffmpeg. Si no lo tienes:
        winget install Gyan.FFmpeg
    y cierra y vuelve a abrir PowerShell.
#>

param(
    [string]$Origen  = ".\originales",
    [string]$Destino = ".\videos",
    [int]   $Alto    = 720,   # resolución vertical de salida
    [int]   $Crf     = 28,    # 24 = más calidad y peso, 32 = más ligero
    [switch]$Rehacer          # vuelve a comprimir aunque ya exista la salida
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "No encuentro ffmpeg en el PATH." -ForegroundColor Red
    Write-Host "Instálalo con:  winget install Gyan.FFmpeg"
    Write-Host "Luego cierra esta ventana de PowerShell y abre otra."
    exit 1
}

if (-not (Test-Path $Origen)) {
    Write-Host "No existe la carpeta $Origen. Créala y mete ahí los vídeos tal como los recibiste." -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Force -Path $Destino | Out-Null

# Nombre de archivo apto para web: sin acentos, sin espacios, minúsculas.
function Get-Slug([string]$texto) {
    $sb = New-Object Text.StringBuilder
    foreach ($c in $texto.Normalize([Text.NormalizationForm]::FormD).ToCharArray()) {
        if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$sb.Append($c)
        }
    }
    $s = $sb.ToString().ToLowerInvariant() -replace '[^a-z0-9]+', '-'
    return ($s -replace '(^-|-$)', '')
}

$extensiones = @("*.mp4","*.mov","*.avi","*.mkv","*.webm","*.3gp","*.m4v","*.mts")
$archivos = Get-ChildItem -Path $Origen -Recurse -Include $extensiones -File

if ($archivos.Count -eq 0) {
    Write-Host "No hay vídeos en $Origen" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "$($archivos.Count) vídeos por procesar. Resolución ${Alto}p, calidad CRF $Crf." -ForegroundColor Cyan
Write-Host ""

$resumen = @()
$i = 0

foreach ($f in $archivos) {
    $i++
    $base = Get-Slug([IO.Path]::GetFileNameWithoutExtension($f.Name))
    if (-not $base) { $base = "video-$i" }
    $salida = Join-Path $Destino "$base.mp4"

    if ((Test-Path $salida) -and -not $Rehacer) {
        Write-Host ("[{0}/{1}] ya existe, salto: {2}" -f $i, $archivos.Count, "$base.mp4") -ForegroundColor DarkGray
        continue
    }

    Write-Host ("[{0}/{1}] {2}" -f $i, $archivos.Count, $f.Name) -ForegroundColor White

    # -movflags +faststart es lo que permite empezar a ver el vídeo sin
    # descargarlo entero. No lo quites.
    & ffmpeg -hide_banner -loglevel error -stats -y `
        -i $f.FullName `
        -vf "scale=-2:$Alto" `
        -c:v libx264 -crf $Crf -preset slow -pix_fmt yuv420p `
        -c:a aac -b:a 96k `
        -movflags +faststart `
        $salida

    if ($LASTEXITCODE -ne 0) {
        Write-Host "   error al procesar, sigo con el siguiente" -ForegroundColor Red
        continue
    }

    $antes   = [math]::Round($f.Length / 1MB, 1)
    $despues = [math]::Round((Get-Item $salida).Length / 1MB, 1)
    $resumen += [pscustomobject]@{
        Archivo = Split-Path $salida -Leaf
        MB_antes = $antes
        MB_despues = $despues
        Reduccion = if ($antes -gt 0) { "$([math]::Round(100 - ($despues / $antes * 100)))%" } else { "-" }
    }
}

Write-Host ""
if ($resumen.Count) {
    $resumen | Format-Table -AutoSize
    $total = [math]::Round(($resumen | Measure-Object MB_despues -Sum).Sum, 1)
    Write-Host "Total en $Destino : $total MB" -ForegroundColor Cyan

    $gordos = $resumen | Where-Object { $_.MB_despues -gt 15 }
    if ($gordos) {
        Write-Host ""
        Write-Host "Estos siguen pesando más de 15 MB. Opciones: repetir con -Crf 32," -ForegroundColor Yellow
        Write-Host "o -Alto 480, o subirlos a YouTube y usar el campo 'youtube' en zonas.js:" -ForegroundColor Yellow
        $gordos | Format-Table -AutoSize
    }
}
Write-Host "Listo. Ahora abre editor.html y ve colocando cada vídeo en su punto del mapa." -ForegroundColor Green
