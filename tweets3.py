import os
import requests
import json
# import threading

def salvar_tweets():
    # Palavras a serem verificadas
    palavras_positivas = ['Honesto', 'Integro', 'Competente', 'Trabalhar', 'Cria', 'Lança', 'Redução']
    palavras_negativas = ['Corrupto', 'Ladrão', 'Corrupção', 'Ruim', 'Morte', 'Aumento', 'Denúncia', 'IMPOSTO']

    payload = {
        'api_key': '67fbab56fad83e9eb05574e9e141618d',
        'query': 'rose modesto',
        'num': '100',
        'country': 'br',
    }

    response = requests.get('https://api.scraperapi.com/structured/twitter/search', params=payload)
    data = response.json()
    all_tweets = data['organic_results']
    twitter_data = [tweet for tweet in all_tweets if 'snippet' in tweet]
    new_negative_tweets = [tweet for tweet in twitter_data if any(palavra.lower() in tweet['snippet'].lower() for palavra in palavras_negativas)]
    new_positive_tweets = [tweet for tweet in twitter_data if any(palavra.lower() in tweet['snippet'].lower() for palavra in palavras_positivas)]

    # Carregar tweets existentes dos arquivos
    positive_tweets = carregar_tweets('positive_tweets.json')
    negative_tweets = carregar_tweets('negative_tweets.json')
    tweets = carregar_tweets('tweets.json')

    # Adicionar novos tweets aos existentes, evitando duplicatas
    for tweet in new_negative_tweets:
        if tweet['snippet'] not in [t['snippet'] for t in negative_tweets]:
            negative_tweets.append(tweet)

    for tweet in new_positive_tweets:
        if tweet['snippet'] not in [t['snippet'] for t in positive_tweets]:
            positive_tweets.append(tweet)

    for tweet in twitter_data:
        if tweet['snippet'] not in [t['snippet'] for t in tweets]:
            tweets.append(tweet)

    # Salvar os tweets atualizados nos arquivos
    salvar_json('positive_tweets.json', positive_tweets)
    salvar_json('negative_tweets.json', negative_tweets)
    salvar_json('tweets.json', tweets)

    print(f"{len(new_positive_tweets)} tweets contendo palavras positivas foram encontrados e salvos em positive_tweets.json.")
    print(f"{len(new_negative_tweets)} tweets contendo palavras negativas foram encontrados e salvos em negative_tweets.json.")

    # Agendar a próxima execução após 1 minuto
    # threading.Timer(60, salvar_tweets).start()

def carregar_tweets(filename):
    tweets = []
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as json_file:
            tweets = json.load(json_file)
    return tweets

def salvar_json(filename, data):
    with open(filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False)

# Iniciar o salvamento dos tweets
salvar_tweets()