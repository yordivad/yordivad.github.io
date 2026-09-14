# Renders docs/cv/Roy-Gonzalez-CV.html to assets/Roy-Gonzalez-CV.pdf with headless Chrome.
# Chrome writes the PDF but does not always exit on Windows, so wait for the file, then stop it.
$root = Resolve-Path "$PSScriptRoot\..\.."
$src = "$root\docs\cv\Roy-Gonzalez-CV.html"
$out = "$root\assets\Roy-Gonzalez-CV.pdf"
$chrome = if ($env:CHROME) { $env:CHROME } else { "C:\Program Files\Google\Chrome\Application\chrome.exe" }
$profile = Join-Path ([IO.Path]::GetTempPath()) ("cv-chrome-" + [guid]::NewGuid())
$before = if (Test-Path $out) { (Get-Item $out).LastWriteTime } else { [datetime]::MinValue }

$p = Start-Process $chrome -PassThru -ArgumentList @(
  '--headless=new', '--disable-gpu', '--no-first-run', "--user-data-dir=$profile",
  '--no-pdf-header-footer', '--virtual-time-budget=10000', "--print-to-pdf=$out", ("file:///" + ($src -replace '\\', '/')))

$deadline = (Get-Date).AddSeconds(60)
while ((Get-Date) -lt $deadline -and -not ((Test-Path $out) -and (Get-Item $out).LastWriteTime -gt $before)) { Start-Sleep -Milliseconds 500 }
Start-Sleep -Seconds 2
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like "*$profile*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue

if ((Get-Item $out).LastWriteTime -gt $before) { "wrote $out" } else { throw "PDF was not written" }
