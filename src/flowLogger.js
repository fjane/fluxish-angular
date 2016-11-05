module.exports = () => {
    return {
        actionEvent: function(action, data) {
            console.log(
                `%cUSER EVENT: ${action}`,
                "background-color:#7f7fff; font-size:8pt; font-family:Verdana; border-radius:8px; padding: 0 10px; border: 1pt solid black;");
        },
        actionLog: function(action, data) {
            console.log("%c", "border:1pt solid black; margin-left:30pt");
            if(data) {
                console.log(
                    `%c${action} %c${data}`,
                    "background-color:#99ff99; font-size:8pt; font-family:Verdana; border-radius:8px 0 0 8px; padding: 0 1px 0 10px; border-style:solid; border-color:black; border-width: 1pt 0 1pt 1pt;",
                    "background-color:#ff7f7f; font-size:8pt; font-family:Verdana; border-radius:0 8px 8px 0; padding: 0 10px 0px 3px; border-style:solid; border-color:black; border-width: 1pt 1pt 1pt 0;");
            }
            else {
                console.log(`%c${action}`, "background-color:#99ff99; font-size:8pt; font-family:Verdana; border-radius:8px; padding: 0 10px; border: 1pt solid black;");
            }
        },
        dispatcherLog: function(action) {
            console.log("%c", "border:1pt solid black; margin-left:30pt");
            console.log(`%cDISPATCHER --> Action: %c${action}`,
                "background-color:#ffc966; font-size:8pt; font-family:Verdana; border-radius:8px 0 0 8px; padding: 0 1px 0 10px; border-style:solid; border-color:black; border-width: 1pt 0 1pt 1pt;",
                "background-color:#ff7f7f; font-size:8pt; font-family:Verdana; border-radius:0 8px 8px 0; padding: 0 10px 0px 3px; border-style:solid; border-color:black; border-width: 1pt 1pt 1pt 0;");

        },
        storeLog: function(functionName, data) {
            console.log("%c", "border:1pt solid black; margin-left:30pt");
            console.log(`%c${functionName}`,
                "background-color:#ffff99; font-size:8pt; font-family:Verdana; border-radius:8px; padding: 0 10px; border: 1pt solid black;");
            console.log("\n\n\n");
        }
    }
}