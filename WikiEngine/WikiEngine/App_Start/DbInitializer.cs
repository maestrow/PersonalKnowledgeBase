using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using WikiEngine.Models;

namespace WikiEngine
{
    public class DbInitializer: DropCreateDatabaseIfModelChanges<WikiEngineContext>
    {
        private DbInitializer() {}

        private static DbInitializer _instance;

        public static DbInitializer Instance
        {
            get
            {
                if(_instance == null)
                    _instance = new DbInitializer();
                return _instance;
            }
        }

        protected override void Seed(WikiEngineContext context)
        {
            context.Pages.AddOrUpdate(page => page.Id,
                new Page() { CreatedAt = new DateTime(2014, 07, 03), LastEditAt = new DateTime(2014, 07, 07), Title = "111", Content = "aaaaa" },
                new Page() { CreatedAt = new DateTime(2014, 07, 04), LastEditAt = new DateTime(2014, 07, 07), Title = "222", Content = "bbbbb" },
                new Page() { CreatedAt = new DateTime(2014, 07, 05), LastEditAt = new DateTime(2014, 07, 07), Title = "333", Content = "ccccc" },
                new Page() { CreatedAt = new DateTime(2014, 07, 06), LastEditAt = new DateTime(2014, 07, 08), Title = "444", Content = "ddddd" },
                new Page() { CreatedAt = new DateTime(2014, 07, 07), LastEditAt = new DateTime(2014, 07, 08), Title = "555", Content = "eeeee" }
                );
        }
    }
}