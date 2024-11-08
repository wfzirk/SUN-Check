
function search_Table(){
	//srchCol = 1;
	var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	console.log('searchtable',searchId, srchType, input)	

	table = document.getElementById(searchId);
	if (table) {
		tr = table.getElementsByTagName("tr");
		for (i = 1; i < tr.length; i++) {		// start row 1
			td = tr[i].getElementsByTagName("td") ; 
			var txt = "+";
			
			for(j=0 ; j < td.length ; j++) {		// start column 0
				let tdata = td[j] ;
				  if (tdata) {
					 txt = txt +'+'+ tdata.innerHTML.toUpperCase();
				  }
			}

			if (srchType === 'word') {  // word search
				txt = txt +'+';
				txt = txt.replace(/ /g,'+')
				txt = txt.replace(/:/g,'+')
				txt = txt.replace(/,/g,'+')
				//txt = txt.split('+')
				
				var found = true;
				for(var f = 0; f < filter.length; f++) {
					if (txt.indexOf('+'+filter[f]+'+')  === -1) { 
						found = false;
					}
				}
			} else {			// char search
				var found = true;
				for(var f = 0; f < filter.length; f++) {
					if (txt.indexOf(filter[f])  === -1) { 
						found = false;
					}
				}
			}	

			if (found) {
					tr[i].style.display = "";
			} else {
					tr[i].style.display = "none";
			}
		}
	}
}
		