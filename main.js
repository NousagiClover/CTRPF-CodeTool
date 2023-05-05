function addcode(code) {
	// 要素を取得
	var codeText = document.getElementById('code');
	var offsetText = document.getElementById('offset');
	var dcoffset = document.getElementById("dc").value;
	var loopCount = document.getElementById("c0").value;
	var baseAddress = document.getElementById("b0").value;
	
	// コードを追加
	switch (code) {
		case "d3":
			if (offsetText.value == "") {
				codeText.value += "D3000000 00000000\n";
			} else {
				codeText.value += "D3000000 " + offsetText.value.padEnd(8, "0") + "\n";
			}
			break;
		case "d2":
			codeText.value += "D2000000 00000000\n";
			break;
		case "d0":
			codeText.value += "D0000000 00000000\n";
			break;
		case "dd":
			// 選択されたキーを取得
			var selectElement = document.getElementById("key");
			var selectedOptions = Array.from(selectElement.selectedOptions);
			var numberArray = selectedOptions.map(option => parseInt(option.value, 16));
			var sum = numberArray.reduce((acc, cur) => acc + cur, 0);
			var btn = sum.toString(16).padStart(8, "0");
			
			codeText.value += "DD000000 " + btn + "\n";
			break;
		case "dc":
			codeText.value += "DC000000 " + dcoffset.padStart(8, "0") + "\n";
			break;
		case "f01":
			codeText.value += "F0000001 00000001\n";
			break;
		case "f00":
			codeText.value += "F0000001 00000000\n";
			break;
		case "c0":
			codeText.value += "C0000000 " + loopCount.padStart(8, "0") + "\n";
			break;
		case "b0":
			codeText.value += "B" + baseAddress.padEnd(7, "0") + " 00000000\n";
			break;
	}
}

function writes() {
	var codeText = document.getElementById('code');
	var addressText = document.getElementById('address').value;
	var valueText = document.getElementById('value').value;
	var selectElement = document.getElementById("size");
	var selectedOption = selectElement.options[selectElement.selectedIndex].value;
	
	switch (selectedOption) {
		case "4":
			codeText.value += "0" + addressText.padEnd(7, "0") + " " + valueText.padStart(8, "0") + "\n";
			break;
		case "2":
			codeText.value += "1" + addressText.padEnd(7, "0") + " 0000" + valueText.padStart(4, "0") + "\n";
			break;
		case "1":
			codeText.value += "2" + addressText.padEnd(7, "0") + " 000000" + valueText.padStart(2, "0") + "\n";
			break;
		case "free":
			codeText.value += addressText.padEnd(8, "0") + " " + valueText.padStart(8, "0") + "\n";
			break;
	}
}

function delcode() {
	// 要素を取得
	var codeText = document.getElementById('code');
	var lines = codeText.value.split("\n");
	
	// 最後の行を削除
	if (lines[lines.length - 1] === "") {
		lines.splice(-2);
		lines.push("");
	} else {
		lines.splice(-1);
	}
	
	// 変更したテキストを反映させる
	codeText.value = lines.join("\n");
}

function delallcode() {
	// 要素を取得
	var codeText = document.getElementById('code');
	// すべてクリア
	codeText.value = "";
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
