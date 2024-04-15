from ntscraper import Nitter
import json

def buscar_tweets_por_termo(termo, numero=10):
    scraper = Nitter(log_level=1, skip_instance_check=False)
    while True:
        instance ='nitter.poast.org'
        try:
            tweets = scraper.get_tweets(mode='term', number=numero, terms=termo, instance=instance)
            return tweets
        except Exception as e:
            print(f"Fetching error: {e}. Trying another instance.")

# Termo a ser buscado
termo = "JeffBezos"  # ou qualquer outro termo que você queira buscar

# Número de tweets a serem buscados
numero_de_tweets = 10  # ou qualquer número desejado

# Buscar os tweets
tweets = buscar_tweets_por_termo(termo, numero=numero_de_tweets)

# Salvar os tweets em um arquivo JSON
with open("filename.json", 'w', encoding='utf-8') as json_file:
    json.dump(tweets, json_file, ensure_ascii=False)