# Polaczenie z repo GitHub i pierwszy push
# Uruchom w PowerShell w tym folderze: .\polacz-z-github.ps1

git add .
git status

$msg = "Initial commit: strona Monte.biuro rachunkowe"
git commit -m $msg

# Jesli repo na GitHubie ma domyslna galeź main:
git branch -M main

# Pierwszy push (może wymagać logowania do GitHub)
git push -u origin main

Write-Host "Gotowe. Jesli push sie nie powiodl (np. repo ma juz commity), uruchom:"
Write-Host "  git pull origin main --allow-unrelated-histories"
Write-Host "  git push -u origin main"
