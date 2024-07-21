// https://github.com/ZulNs/Draggable-Resizable-Dialog
_showDialogButton = document.getElementById('show-dialog');
_statusDialog = document.getElementById('dialog-status');
_modelContent = document.getElementById('modalcontent');
var dialog;
function showDialog() {
	if (!dialog) {
		var id = 'dialog';
		// Instanciate the Dialog Box
		dialog = new DialogBox(id, callbackDialog);
	}
	// Show Dialog Box
	dialog.showDialog();

	// Receive result from Dialog Box
	function callbackDialog(btnName) {
		//_showDialogButton.disabled = false;
		//_showDialogButton.focus();
		//if (btnName == 'close')
		//	_statusDialog.textContent = 'Dialog hidden...';
		//else
		//	_statusDialog.textContent = btnName + ' button clicked...';
	}
}

// (https://zulns.github.io/Draggable-Resizable-Dialog/)
const mdlHdr = ["Item", "Value"];	
function dispModal(btn, errData) {
	btn.onclick = function(e) {
		//showDialog();
		console.log(errData);
		let table = document.createElement('table');
		table.id = "mdlTable";
		let thead = document.createElement('THEAD');
		let tr = document.createElement('TR');
		for (var i in mdlHdr) {
			let th = document.createElement("TH");
			th.appendChild(document.createTextNode(mdlHdr[i]));
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		let tbody = document.createElement('TBODY');
			let keys = Object.keys(errData);
			//console.log(keys);
			for (const [key, value] of Object.entries(errData)) {
				//console.log(key, value);


				tr = document.createElement('TR');	// row
				var td = document.createElement("TD");
				td.appendChild(document.createTextNode(key));
				tr.appendChild(td);
				td = document.createElement("TD");
				td.appendChild(document.createTextNode(value));
				tr.appendChild(td);
				tbody.appendChild(tr);	
			}	

		tbody.appendChild(tr);
		table.appendChild(tbody);
		
		//console.log(table.outerHTML);
		_modelContent.innerHTML = table.outerHTML;
		showDialog();
	}	
}
