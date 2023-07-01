## Attention visualizer

A minimal web interface template for viewing attention layers in language models: load any HF model (or your own) and adjust sliders (adjust slider limits for layer and head in `app.js` when using a different model) to view attention pattern at a particular layer and head.

<div align="center"><img width="1130" alt="induction_head" src="https://github.com/okarthikb/llm-attn-vis/assets/86470305/09b6dd78-f186-4f48-bc29-afe9b04d232e"></div>

Above example: GPT-2 small's head 2 in layer 6 is an induction head ('y' is selected here and anything that comes after 'y' is highlighted; the same character follows 'y' everywhere, so the scores are higher). Induction heads are hypothesized to be the main driver of in-context learning in large language models.

<div align='center'>
  <img width="756" alt="Screen Shot 2023-06-30 at 9 28 15 PM" src="https://github.com/okarthikb/AttentionVis/assets/86470305/1bb6ae4f-1c8f-420f-9bd4-75140c98a66e">
</div>

This project was inspired by Anthropic's [A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html) and [In-context Learning and Induction Heads](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html) posts and Neel Nanda's [induction mosaic](https://www.neelnanda.io/mosaic).
