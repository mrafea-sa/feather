﻿using System;
using Telerik.Sitefinity.Frontend.TestUtilities.CommonOperations;
using Telerik.Sitefinity.Services;
using Telerik.Sitefinity.TestArrangementService.Attributes;
using Telerik.Sitefinity.TestUI.Arrangements.Framework;
using Telerik.Sitefinity.TestUtilities.CommonOperations;

namespace Telerik.Sitefinity.Frontend.TestUI.Arrangements
{
    /// <summary>
    /// DeactivateFeatherAndDeleteWidgetFromHybridPage arragement.
    /// </summary>
    public class DeactivateFeatherAndDeleteWidgetFromHybridPage : ITestArrangement
    {
        /// <summary>
        /// Server side set up. 
        /// </summary>
        [ServerSetUp]
        public void SetUp()
        {
            AuthenticationHelper.AuthenticateUser(AdminEmail, AdminPass, true);
            Guid templateId = ServerOperations.Templates().CreateHybridMVCPageTemplate(PageTemplateName);
            ServerOperations.Pages().CreatePage(PageName, templateId);
        }

        /// <summary>
        /// Tears down.
        /// </summary>
        [ServerTearDown]
        public void TearDown()
        {
            AuthenticationHelper.AuthenticateUser(AdminEmail, AdminPass, true);
            ServerOperations.Pages().DeletePage(PageName);
            ServerOperations.Templates().DeletePageTemplate(PageTemplateName);
        }

        private const string AdminEmail = "admin@test.test";
        private const string AdminPass = "admin@2";
        private const string PageName = "Page_DeactivateFeatherAndDeleteWidgetFromHybridPage";
        private const string PageTemplateName = "Template_DeactivateFeatherAndDeleteWidgetFromHybridPage";
    }
}
