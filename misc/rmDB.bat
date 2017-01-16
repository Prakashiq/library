@echo off

net stop primaryLibrary


mongod --remove 
 
del /q /s C:\dev\library\MongoDB 

