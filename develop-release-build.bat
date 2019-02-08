call npm run build
rmdir /S /Q C:\data\gitrepo\embriosupport-dev-page\dist
move .\dist C:\data\gitrepo\embriosupport-dev-page\dist
cd C:\data\gitrepo\embriosupport-dev-page
call upload.bat

pause .
