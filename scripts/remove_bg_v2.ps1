
Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\PMLS\.gemini\antigravity\brain\af8a62c5-aa9e-45fc-a2e0-2cf7f19bf601\astronaut_scientist_cutout_v6_pure_black_bg_1772820217247.png"
$destPath = "c:\Users\PMLS\Desktop\Frontend\DilawarBhai Projects\Tamx\tamxai\public\images\infinity-scientist.png"

$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)

# Sample the corners to find the "background" color (usually the dark box)
$c1 = $bmp.GetPixel(0,0)
$c2 = $bmp.GetPixel($bmp.Width-1, 0)
$c3 = $bmp.GetPixel(0, $bmp.Height-1)
$c4 = $bmp.GetPixel($bmp.Width-1, $bmp.Height-1)

Write-Host "Corner Pixels: R$($c1.R)G$($c1.G)B$($c1.B), R$($c2.R)G$($c2.G)B$($c2.B), R$($c3.R)G$($c3.G)B$($c3.B), R$($c4.R)G$($c4.G)B$($c4.B)"

# Average or max of corners
$maxR = [Math]::Max($c1.R, [Math]::Max($c2.R, [Math]::Max($c3.R, $c4.R)))
$maxG = [Math]::Max($c1.G, [Math]::Max($c2.G, [Math]::Max($c3.G, $c4.G)))
$maxB = [Math]::Max($c1.B, [Math]::Max($c2.B, [Math]::Max($c3.B, $c4.B)))

# Use a wider threshold (e.g., source + 20)
$thresholdR = $maxR + 25
$thresholdG = $maxG + 25
$thresholdB = $maxB + 25

Write-Host "Thresholds: R$thresholdR G$thresholdG B$thresholdB"

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        
        # If the pixel is close to the background color, make it transparent
        # Using a distance-based or simple threshold
        if ($pixel.R -le $thresholdR -and $pixel.G -le $thresholdG -and $pixel.B -le $thresholdB) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        } else {
            $newBmp.SetPixel($x, $y, $pixel)
        }
    }
}

$newBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$newBmp.Dispose()

Write-Host "Aggressive background removal complete."
