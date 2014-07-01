## Введение

- Функция полнотекстового поиска доступна в редакции `Microsoft SQL Server 2014 Express With Advanced Features`.
- [Full-Text Search - Раздел документации в MSDN](http://msdn.microsoft.com/en-us/library/ms142571.aspx)
- Альтернатива FTS: http://lucenenet.apache.org

## Filter Pack

- Установить Microsoft Office Filter Pack, обновить их через центр обновления Windows
- Для поиска в pdf установить [Adobe PDF iFilter 9 for 64-bit platforms](http://www.adobe.com/support/downloads/detail.jsp?ftpID=4025). Обязательно прописать путь `C:\Program Files\Adobe\Adobe PDF iFilter 9 for 64-bit platforms\bin\` в переменную среды `PATH` (http://stackoverflow.com/a/22294052).

### Реализация кастомного IFilter

- http://msdn.microsoft.com/en-us/library/ee872063(v=VS.85).aspx
- http://msdn.microsoft.com/en-us/library/ee872090(v=VS.85).aspx
- http://msdn.microsoft.com/en-us/library/bb266451(v=vs.85).aspx


## T-Sql

### Поддерживаемые типы документов

После установки и обновления FilterPack

	exec sp_fulltext_service 'load_os_resources', 1; --Load the new filters.
	exec sp_fulltext_service 'update_languages';     --Update the system metadata about what filters are installed.
	exec sp_fulltext_service 'restart_all_fdhosts';  --Restart the filter daemon.

	-- выводим список типов документов, которые поддерживает полнотекстовый поиск
	SELECT * FROM sys.fulltext_document_types ORDER BY document_type 


### Создание каталога полнотекстового поиска и индекса для таблицы

	CREATE FULLTEXT CATALOG FulltextCatalog AS DEFAULT;
	CREATE FULLTEXT INDEX ON books (file_stream TYPE COLUMN file_type) KEY INDEX ui_file_stream;


### Системные представления и функции

[Full-Text Search and Semantic Search Dynamic Management Views and Functions](http://msdn.microsoft.com/en-us/library/ms174971.aspx)

Наиболее интересные функции:

- `sys.dm_fts_index_keywords`
- `sys.dm_fts_index_keywords_by_document` 
- `sys.dm_fts_parser`
	
Возвращает информацию об активных полнотекстовых каталогах в БД:

	SELECT 
		catalog.name, 
		catalog.is_importing, 
		catalog.auto_population_count, 
		OBJECT_NAME(population.table_id) AS table_name, 
		population.population_type_description, 
		population.is_clustered_index_scan, 
		population.status_description, 
		population.completion_type_description, 
		population.queued_population_type_description, 
		population.start_time, 
		population.range_count 
	FROM 
		sys.dm_fts_active_catalogs catalog 
		CROSS JOIN sys.dm_fts_index_population population 
	WHERE 
		catalog.database_id = population.database_id 
		AND catalog.catalog_id = population.catalog_id 
		AND catalog.database_id = (SELECT dbid FROM sys.sysdatabases WHERE name = DB_NAME());

Посмотрите на результат использования `sys.dm_fts_parser` для применения в отладочных целях:

	SELECT * FROM sys.dm_fts_parser (' FORMSOF( INFLECTIONAL, "Он был превосходным учителем по русскому языку и литературе") ', 1049, 0, 0);


### Перестроить индекс

	ALTER FULLTEXT CATALOG catalog_name REBUILD 
	ALTER FULLTEXT INDEX ON books START FULL POPULATION


### Пример запросов полнотекстового поиска

	select * from books where contains(file_stream, '"создание экземпляра"')


## Hit-Highlighting in Full-Text Search

Данная функция в самом SQL Server'е [пока не реализована и не планируется](http://connect.microsoft.com/SQLServer/feedback/details/722324/would-be-nice-if-sql-full-text-search-provided-snippet-highlighting-support).

- [Обзор ситуации, бесплатного и платного решения](http://sqlperformance.com/2012/09/t-sql-queries/hit-highlighting-in-full-text-search). 
- [Коммерческий продукт](http://www.interactivethoughts.com/products/). 
- [Функция Mike Kramar'а](http://www.codeproject.com/Articles/623815/Hit-Highlight-for-SQL-Server-Full-Text-Search).

