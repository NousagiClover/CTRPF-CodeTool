// 変数定義
var codelist = [];
var codehistory = [[]];
var line = 0;
var idxHis = 0;
var checkHis = 0;
	

function writeCode(code, index) {
	// textareaを取得
	var codeText = document.getElementById('code');
	
	if (index == 0) {
		index = codelist.length + 1;
	} else {
		index -= 1;
	}
	
	// codelistにコードを追加する
	codelist.splice(index, 0, code);
	// codelistをtextareaに書き込む
	codeText.value = codelist.join("");
}

function addcode(code) {
	// 要素を取得
	var codeText = document.getElementById('code');
	var valueText = document.getElementById('value2').value;
	
	// コードを追加
	switch (code) {
		case "b0":
			writeCode("B" + valueText.padEnd(7, "0") + " 00000000\n", line);
			break;
			
		case "c0":
			writeCode("C0000000 " + valueText.padStart(8, "0") + "\n", line);
			break;
			
		case "c1":
			writeCode("C1000000 00000000\n", line);
			break;
			
		case "c2":
			writeCode("C2000000 00000000\n", line);
			break;
			
		case "d0":
			writeCode("D0000000 00000000\n", line);
			break;
			
		case "d1":
			writeCode("D1000000 00000000\n", line);
			break;
			
		case "d2":
			writeCode("D2000000 00000000\n", line);
			break;
			
		case "d3":
			writeCode("D3000000 " + valueText.padEnd(8, "0") + "\n", line);
			break;
			
		case "dc":
			writeCode("DC000000 " + valueText.padStart(8, "0") + "\n", line);
			break;
			
		case "dd":
			// 選択されたキーを取得
			var selectElement = document.getElementById("key");
			var selectedOptions = Array.from(selectElement.selectedOptions);
			var numberArray = selectedOptions.map(option => parseInt(option.value, 16));
			var sum = numberArray.reduce((acc, cur) => acc + cur, 0);
			var btn = sum.toString(16).padStart(8, "0");
			writeCode("DD000000 " + btn + "\n", line);
			selectElement.selectedIndex = -1;
			break;
			
		case "f01":
			writeCode("F0000001 00000001\n", line);
			break;
			
		case "f00":
			writeCode("F0000001 00000000\n", line);
			break;
			
		case "break":
			writeCode("D0000000 00000001\n", line);
			break;
			
		case "fx":
			// 要素を取得
			var num = document.getElementById("inputASMD").value;
			var selectElement = document.getElementById("asmd");
			var selectedOption = selectElement.options[selectElement.selectedIndex].value;
			
			switch (selectedOption) {
				case "add":
					writeCode("F1" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				case "sub":
					// 即値の符号をマイナスにする
					if (num == "" || num == "0") {
						num = "0";
					} else {
						num = parseInt(num);
						num -= 1;
						num = 0xFFFFFFFF - num;
						num = num.toString(16).toUpperCase();
					}
					
					writeCode("F1" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				case "mul":
					writeCode("F2" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				case "div":
					writeCode("F3" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
			}
			
			break;
			
		case "if":
			// 要素を取得
			var num = document.getElementById("inputcmp").value;
			var selectElement = document.getElementById("cmp");
			var selectedOption = selectElement.options[selectElement.selectedIndex].value;
			
			switch (selectedOption) {
				case 'equal':
					writeCode("5" + valueText.padEnd(7, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				case 'noteq':
					writeCode("6" + valueText.padEnd(7, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				
				case 'greater':
					writeCode("3" + valueText.padEnd(7, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
					
				case 'less':
					writeCode("4" + valueText.padEnd(7, "0") + " " + num.padStart(8, "0") + "\n", line);
					break;
			}
			break;
			
		// case
		
	}
}

function writes() {
	var codeText = document.getElementById('code');
	var addressText = document.getElementById('address').value;
	var valueText = document.getElementById('value').value;
	var selectElement = document.getElementById("size");
	var selectedOption = selectElement.options[selectElement.selectedIndex].value;
	var dataArray = selectedOption.split(",");
	
	switch (dataArray[0]) {
		case "4byte":
			writeCode("0" + addressText.padEnd(7, "0") + " " + valueText.padStart(8, "0") + "\n", line);
			break;
			
		case "2byte":
			writeCode("1" + addressText.padEnd(7, "0") + " 0000" + valueText.padStart(4, "0") + "\n", line);
			document.getElementById("address").setAttribute("placeholder", "1XXXXXXX");
			break;
			
		case "1byte":
			writeCode("2" + addressText.padEnd(7, "0") + " 000000" + valueText.padStart(2, "0") + "\n", line);
			document.getElementById("address").setAttribute("placeholder", "2XXXXXXX");
			break;
			
		case "free":
			writeCode(addressText.padEnd(8, "0") + " " + valueText.padStart(8, "0") + "\n", line);
			document.getElementById("address").setAttribute("placeholder", "XXXXXXXX");
			break;
			
		case "pointer":
			writeCode(addressText.padStart(8, "0") + " " + valueText.padStart(8, "0") + "\n", line);
			document.getElementById("address").setAttribute("placeholder", "BXXXXXXX");
			break;
			
		// case"":
	}
}

function replacePH() {
	var selectElement = document.getElementById("size");
	var selectedOption = selectElement.options[selectElement.selectedIndex].value;
	var dataArray = selectedOption.split(",");
	
	document.getElementById("address").setAttribute("placeholder", dataArray[1]);
	document.getElementById("value").setAttribute("placeholder", dataArray[2]);
}

function delcode(range) {
	// 要素を取得
	var codeText = document.getElementById('code');
	var delline = line;
	
	// バックアップ
	codehistory.splice(codehistory.length - 1, 0, codelist.slice());
	checkHis += 1;
	
	if (codeText.value == "") return;
	switch (range) {
		case "line":
			if (delline == 0) {
				delline = codelist.length - 1;
			} else {
				delline -= 1;
			}
			
			codelist.splice(delline, 1);
			codeText.value = codelist.join("");
			break;
			
		case "all":
			// すべてクリア
			codelist = [];
			codeText.value = "";
			break;
			
		// case "":
	}
}

function dlcode() {
	var codeText = document.getElementById('code').value;
	
	if (codeText == "") {
		alert("データがありません。");
	} else {
		const element = document.createElement('a');
		const file = new Blob([codeText], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = 'Free_cheat.txt';
		document.body.appendChild(element);
		element.click();
	}
}

function copy() {
	const cheatTextarea = document.getElementById("code");
	const textToCopy = cheatTextarea.value;
	navigator.clipboard.writeText(textToCopy).then(() => {
  		alert("クリップボードにコピーしました");
	}).catch((error) => {
		alert("クリップボードへの書き込みに失敗しました");
	});
}

function checkInput(input) {
	var inputValue = input.value;
	var validInput = /^[0-9]*$/.test(inputValue);
	
	if (!validInput) {
		input.value = inputValue.replace(/[^0-9]/g, '');
	}
}

function getline() {
	var tmpline = document.getElementById("index").value;
	
	if (tmpline == "") tmpline = "0";
	
	tmpline = parseInt(tmpline);
	
	return tmpline;
}

function getHistory() {
	var codeText = document.getElementById('code');
	if (checkHis <= 0) return;
	idxHis += 1;
	checkHis -= 1;
	var arr = codehistory[codehistory.length - (idxHis + 1)];
	codelist = arr.slice(0);
	codeText.value = codelist.join("");
}

function loopfnc() {
	replacePH();
	line = getline();
}

setInterval(loopfnc, 100);
