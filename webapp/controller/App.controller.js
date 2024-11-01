sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], (Controller) => {
    "use strict";
 
    return Controller.extend("ui5.exceltojson.controller.App", {

       onFileUpload: function (event) {
           var that = this;
           var file = event.getParameter("files")[0];
           var reader = new FileReader();

           reader.onload = function (e) {
               var data = new Uint8Array(e.target.result);
               var workbook = XLSX.read(data, {
                   type: 'array'
               });

               // Extract data from the first sheet
               var worksheet = workbook.Sheets[workbook.SheetNames[0]];
               var jsonData = XLSX.utils.sheet_to_json(worksheet);

               // Use the jsonData as desired (e.g., display in a table, perform operations, etc.)
               console.log(jsonData);
               that.byId("textArea").setValue(JSON.stringify(jsonData));
           };

           reader.readAsArrayBuffer(file);
       }
    });
 });