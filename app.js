document.addEventListener('DOMContentLoaded', function() {
  const promptForm = document.getElementById('prompt-form');
  const promptTextElement = document.getElementById('prompt-text');
  const layerSlider = document.getElementById('layer');
  const headSlider = document.getElementById('head');
  const layerValue = document.getElementById('layer-value');
  const headValue = document.getElementById('head-value');
  let spans = [];
  let attentions = [];

  function visualizeAttention(currentIndex) {
    const layer = parseInt(layerSlider.value) - 1;
    const head = parseInt(headSlider.value) - 1;
    // get the softmax-ed query (highlighted span) and keys (of all previous tokens) dot products
    // these are the alpha values for highlighting each span
    const attentionScores = attentions[layer][head][currentIndex];
    spans.forEach((span, i) => span.style.backgroundColor = `rgba(255, 255, 0, ${attentionScores[i]})`);
  }

  [layerSlider, headSlider].forEach(slider => {
    slider.addEventListener('input', function() {
      const highlightedElement = document.querySelector('.highlight');
      if (highlightedElement) {
        const currentIndex = parseInt(highlightedElement.dataset.index);
        visualizeAttention(currentIndex);
      }
      slider.id === 'layer' ? layerValue.textContent = slider.value : headValue.textContent = slider.value;
    });
  });

  promptForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const data = {
      prompt: prompt
    };
    fetch('/attention_scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      const inputTokens = data.input_tokens;
      attentions = data.attentions;
      spans = [];
      promptTextElement.innerHTML = '';
      inputTokens.forEach((token, i) => {
        const span = document.createElement('span');
        span.innerHTML = token.replace(/Ġ/g, ' ').replace(/Ċ/g, '<br>');
        span.dataset.index = i;
        span.addEventListener('click', function() {
          spans.forEach((span) => span.style.backgroundColor = 'transparent');
          if (this.classList.contains('highlight')) {
            this.classList.remove('highlight');
          } else {
            this.classList.add('highlight');
            const currentIndex = parseInt(this.dataset.index);
            visualizeAttention(currentIndex);
          }
        });
        spans.push(span);
        promptTextElement.appendChild(span);
      });
    });
  });
});
