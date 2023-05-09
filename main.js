function addcode(code) {
	// 要素を取得
	var codeText = document.getElementById('code');
	var valueText = document.getElementById('value2').value;
	
	// コードを追加
	switch (code) {
		case "b0":
			codeText.value += "B" + valueText.padEnd(7, "0") + " 00000000\n";
			break;
			
		case "c0":
			codeText.value += "C0000000 " + valueText.padStart(8, "0") + "\n";
			break;
			
		case "c1":
			codeText.value += "C1000000 00000000\n";
			break;
			
		case "c2":
			codeText.value += "C2000000 00000000\n";
			break;
			
		case "d0":
			codeText.value += "D0000000 00000000\n";
			break;
			
		case "d1":
			codeText.value += "D1000000 00000000\n";
			break;
			
		case "d2":
			codeText.value += "D2000000 00000000\n";
			break;
			
		case "d3":
			codeText.value += "D3000000 " + valueText.padEnd(8, "0") + "\n";
			break;
			
		case "dc":
			codeText.value += "DC000000 " + valueText.padStart(8, "0") + "\n";
			break;
			
		case "dd":
			// 選択されたキーを取得
			var selectElement = document.getElementById("key");
			var selectedOptions = Array.from(selectElement.selectedOptions);
			var numberArray = selectedOptions.map(option => parseInt(option.value, 16));
			var sum = numberArray.reduce((acc, cur) => acc + cur, 0);
			var btn = sum.toString(16).padStart(8, "0");
			codeText.value += "DD000000 " + btn + "\n";
			selectElement.selectedIndex = -1;
			break;
			
		case "f01":
			codeText.value += "F0000001 00000001\n";
			break;
			
		case "f00":
			codeText.value += "F0000001 00000000\n";
			break;
			
		case "break":
			codeText.value += "D0000000 00000001\n";
			break;
			
		case "fx":
			// 要素を取得
			var num = document.getElementById("inputASMD").value;
			var selectElement = document.getElementById("asmd");
			var selectedOption = selectElement.options[selectElement.selectedIndex].value;
			
			switch (selectedOption) {
				case "add":
					codeText.value += "F1" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n";
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
					
					codeText.value += "F1" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n";
					break;
					
				case "mul":
					codeText.value += "F2" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n";
					break;
					
				case "div":
					codeText.value += "F3" + valueText.padEnd(6, "0") + " " + num.padStart(8, "0") + "\n";
					break;
			}
			
			break;
			
		// case "":
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
			codeText.value += "0" + addressText.padEnd(7, "0") + " " + valueText.padStart(8, "0") + "\n";
			break;
			
		case "2byte":
			codeText.value += "1" + addressText.padEnd(7, "0") + " 0000" + valueText.padStart(4, "0") + "\n";
			document.getElementById("address").setAttribute("placeholder", "1XXXXXXX");
			break;
			
		case "1byte":
			codeText.value += "2" + addressText.padEnd(7, "0") + " 000000" + valueText.padStart(2, "0") + "\n";
			document.getElementById("address").setAttribute("placeholder", "2XXXXXXX");
			break;
			
		case "free":
			codeText.value += addressText.padEnd(8, "0") + " " + valueText.padStart(8, "0") + "\n";
			document.getElementById("address").setAttribute("placeholder", "XXXXXXXX");
			break;
			
		case "pointer":
			codeText.value += addressText.padStart(8, "0") + " " + valueText.padStart(8, "0") + "\n";
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
	var lines = codeText.value.split("\n");
	
	switch (range) {
		case "line":
			// 最後の行を削除
			if (lines[lines.length - 1] === "") {
				lines.splice(-2);
				lines.push("");
			} else {
				lines.splice(-1);
			}
			// 変更したテキストを反映させる
			codeText.value = lines.join("\n");
			break;
			
		case "all":
			// すべてクリア
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

setInterval(replacePH, 100);
