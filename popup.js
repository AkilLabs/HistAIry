function getStartTime(range) {
  const now = Date.now();
  const oneHour = 1000 * 60 * 60;
  switch (range) {
    case '1h': return now - oneHour;
    case '24h': return now - (oneHour * 24);
    case '7d': return now - (oneHour * 24 * 7);
    case '30d': return now - (oneHour * 24 * 30);
    default: return now - (oneHour * 24); // fallback: Today
  }
}

function loadHistory(range = '24h') {
  const startTime = getStartTime(range);

  chrome.history.search({ text: '', startTime: startTime, maxResults: 100 }, (items) => {
    const list = document.getElementById('historyList');
    list.innerHTML = '';

    if (items.length === 0) {
      list.innerHTML = '<li>No history found for selected time range.</li>';
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.title || 'No title'}</strong><br>
        <small><a href="${item.url}" target="_blank">${item.url}</a></small>
      `;
      list.appendChild(li);
    });
  });
}


async function summarizeHistoryText(text) {
  const response = await fetch('http://localhost:5000/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  return data.summary;
}

async function handleSummarize(range) {
  const startTime = getStartTime(range);
  chrome.history.search({ text: '', startTime, maxResults: 50 }, async (items) => {
    if (!items || items.length === 0) {
      document.getElementById('summaryBox').textContent = 'No history to summarize.';
      return;
    }

    const historyText = items.map(i => `${i.title || 'Untitled'} - ${i.url}`).join('\n');
    document.getElementById('summaryBox').textContent = 'Summarizing...';

    try {
      const summary = await summarizeHistoryText(historyText);
      document.getElementById('summaryBox').textContent = summary;
    } catch (e) {
      document.getElementById('summaryBox').textContent = 'Error fetching summary.';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('timeRange');
  const button = document.getElementById('loadBtn');
  const summarizeBtn = document.getElementById('summarizeBtn');

  // Load initial history (default to today)
  loadHistory(dropdown.value);

  button.addEventListener('click', () => {
    loadHistory(dropdown.value);
  });

  if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
      const range = dropdown.value;
      handleSummarize(range);
    });
  }
});
