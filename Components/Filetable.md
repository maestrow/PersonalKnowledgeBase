## T-Sql

### Создание БД

	CREATE DATABASE FileSystemMeta
	ON 
		PRIMARY (NAME = FileSystemMeta, FILENAME = 'z:\dbs\FileSystemMeta\FileSystemMeta.mdf'),
		FILEGROUP 
			FileStreamGroup CONTAINS FILESTREAM (NAME = FileSystemMetaFilestream, FILENAME = 'z:\dbs\FileSystemMeta\Filestream')
		LOG ON (NAME = FileSystemMetaLog, FILENAME = 'z:\dbs\FileSystemMeta\FileSystemMeta.ldf')
	WITH 
		FILESTREAM ( NON_TRANSACTED_ACCESS = FULL, DIRECTORY_NAME = 'FileSystemMeta' )
	GO


### Создание таблицы

	CREATE TABLE books AS FileTable WITH (FILETABLE_STREAMID_UNIQUE_CONSTRAINT_NAME = ui_file_stream)


### Присоединение (Attach) базы данных с Filestream

	CREATE DATABASE FileSystemMeta
	ON 
		(FILENAME = 'z:\dbs\FileSystemMeta\FileSystemMeta.mdf'),
		(FILENAME = 'z:\dbs\FileSystemMeta\FileSystemMeta.ldf'),
		FILEGROUP 
			FileStreamGroup CONTAINS FILESTREAM (NAME = FileSystemMetaFilestream, FILENAME = 'z:\dbs\FileSystemMeta\Filestream')
	FOR ATTACH

