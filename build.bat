call npm run build
rmdir /S /Q C:\data\gitrepo\githubpage-test\dist
move .\dist C:\data\gitrepo\githubpage-test\dist
cd C:\data\gitrepo\githubpage-test
call upload.bat

pause .
