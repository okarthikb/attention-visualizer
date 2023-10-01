from flask import Flask, render_template, request, jsonify, send_file
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


app = Flask(__name__, template_folder='./', static_folder='./')

model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-125M").eval().to('cpu')
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")


@app.route('/')
def index():
  return render_template('index.html')


@app.route('/app.js')
def serve_js():
  return send_file('app.js', mimetype='application/javascript')


@app.route('/cmu.sans-serif-medium.ttf')
def serve_font():
  return send_file('cmu.sans-serif-medium.ttf', mimetype='font/ttf')


@app.route('/style.css')
def serve_css():
  return send_file('style.css', mimetype='text/css')


@app.route('/attention_scores', methods=['POST'])
def attention_scores():
  prompt = request.json.get('prompt')
  input_tokens = tokenizer.tokenize(prompt)
  input_token_ids = tokenizer(prompt, return_tensors="pt").input_ids.to('cpu')

  with torch.no_grad():
    attentions = model(input_token_ids, output_attentions=True).attentions
  attentions = [attention.squeeze(0).tolist() for attention in attentions]

  return jsonify({'input_tokens': input_tokens, 'attentions': attentions})


if __name__ == '__main__':
  app.run(host='localhost', port=10000, debug=True)
