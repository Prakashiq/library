@echo off

mkdir C:\dev\library\misc\MongoDB
mkdir C:\dev\library\misc\MongoDB\db_30000
mkdir C:\dev\library\misc\MongoDB\db_30000\log
mkdir C:\dev\library\misc\MongoDB\db_30001
mkdir C:\dev\library\misc\MongoDB\db_30001\log
mkdir C:\dev\library\misc\MongoDB\db_29999
mkdir C:\dev\library\misc\MongoDB\db_29999\log
mkdir C:\dev\library\misc\MongoDB\etc


set primaryCfg=C:\dev\library\misc\MongoDB\etc\LibraryPrimarydb.cfg

set primaryDB=C:/dev/library/misc/MongoDB/db_30000

set primaryLog=C:/dev/library/misc/MongoDB/db_30000/log/primaryLibrary.log

set primaryPort=30000



@echo # data place holder > %primaryCfg%
@echo dbpath=%primaryDB%  >> %primaryCfg%

@echo #log >> %primaryCfg%
@echo logpath=%primaryLog% >> %primaryCfg%

@echo #Debug level >> %primaryCfg%
@echo verbose=v >> %primaryCfg%

@echo #port >> %primaryCfg%
@echo port=%primaryPort% >> %primaryCfg%




mongod -f %primaryCfg% --install --serviceName primaryLibrary --serviceDisplayName primaryLibrary


net start primaryLibrary

