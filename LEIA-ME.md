# Meu Dinheiro 3.0: app Android nativo (APK)

Não é mais PWA. O projeto usa **Capacitor**: o GitHub compila e entrega um arquivo **MeuDinheiro.apk**, que você instala no celular igual um jogo.

## Passo a passo (uma vez só)

1. Crie um repositório no GitHub (pode ser privado) e suba **todo o conteúdo desta pasta** (incluindo a pasta `.github`).
2. Abra a aba **Actions** do repositório. O build roda sozinho a cada envio (ou clique em *Gerar APK > Run workflow*).
3. Quando terminar (uns 5 a 8 minutos), baixe o APK em **Releases** (lado direito da página inicial) ou em *Actions > a execução > Artifacts*.
4. Mande o APK para o celular, abra e instale (o Android pede para permitir "instalar apps desconhecidos").

## Assinatura (para o app ser "certificado" e atualizar sem perder dados)

Sem chave própria, o APK sai assinado com a chave de teste do Android. Funciona, mas **cada build pode ter assinatura diferente e o Android recusa atualizar por cima**. Para evitar isso, crie uma chave fixa **uma única vez** (no PC com Java ou no Termux):

    keytool -genkeypair -v -keystore meu-dinheiro.jks -alias meudinheiro -keyalg RSA -keysize 2048 -validity 10000

Converta para texto: `base64 -w0 meu-dinheiro.jks` (no Windows: `certutil -encode`).

No GitHub: *Settings > Secrets and variables > Actions > New repository secret*:

| Nome | Valor |
|---|---|
| KEYSTORE_BASE64 | o texto base64 do .jks |
| KEYSTORE_PASSWORD | a senha que você escolheu |
| KEY_ALIAS | meudinheiro |
| KEY_PASSWORD | senha da chave (se for igual à do keystore, pode omitir) |

**Guarde o arquivo .jks e as senhas em lugar seguro.** Se perder, não dá mais para atualizar o app já instalado.

## Importante sobre os dados

Os dados ficam no aparelho (como antes). Ao instalar o app nativo, **ele começa vazio**: o PWA guardava os dados em outro lugar. Para migrar: no PWA antigo, *Mais > Salvar backup*; no app novo, *Mais > Restaurar backup*.

## Atualizações

Edite `www/index.html`, suba no GitHub, baixe o novo APK e instale por cima (mesma chave = mantém os dados). O número de versão sobe sozinho a cada build.
