document.addEventListener('DOMContentLoaded', function () {
  const notepad = document.getElementById('notepad');
  const clearBtn = document.getElementById('clear-btn');
  const downloadBtn = document.getElementById('download-btn');
  const bgColorPicker = document.getElementById('bg-color-picker');
  const textColorPicker = document.getElementById('text-color-picker');

  // Load the saved content from localStorage
  const savedContent = localStorage.getItem('notepadContent');
  const savedBgColor = localStorage.getItem('notepadBgColor') || '#000000';
  const savedTextColor = localStorage.getItem('notepadTextColor') || '#ffffff';

  if (savedContent) {
    notepad.innerHTML = savedContent;
  }
  notepad.style.backgroundColor = savedBgColor;
  notepad.style.color = savedTextColor;
  bgColorPicker.value = savedBgColor;
  textColorPicker.value = savedTextColor;

  // Save content on every change
  notepad.addEventListener('input', function () {
    localStorage.setItem('notepadContent', notepad.innerHTML);
  });

  // Clear notepad content
  clearBtn.addEventListener('click', function () {
    notepad.innerHTML = '';
    localStorage.setItem('notepadContent', '');
  });

  // Download content as a .txt file
  downloadBtn.addEventListener('click', function () {
    const content = notepad.innerText; // Use innerText to avoid HTML tags in the text
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notepad.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Change background color
  bgColorPicker.addEventListener('input', function () {
    const bgColor = bgColorPicker.value;
    notepad.style.backgroundColor = bgColor;
    localStorage.setItem('notepadBgColor', bgColor);
  });

  // Change text color
  textColorPicker.addEventListener('input', function () {
    const textColor = textColorPicker.value;
    notepad.style.color = textColor;
    localStorage.setItem('notepadTextColor', textColor);
  });
});