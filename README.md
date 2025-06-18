# 🎵 Music Playlist

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Spotify-Web%20API-1DB954?logo=spotify&logoColor=white" alt="Spotify Web API" />
</p>

---

Uma aplicação web para adicionar músicas à fila de reprodução do Spotify Premium de forma **colaborativa e simples**, sem exigir autenticação dos usuários convidados.

---

## ✨ Funcionalidades

- ✅ Adicione músicas à fila de reprodução da conta Spotify Premium conectada.
- ✅ Interface amigável para convidados adicionarem músicas e visualizarem sem login no Spotify.
- ✅ Visualize a faixa que está tocando no momento.
- ✅ Integração segura via OAuth 2.0 com a API do Spotify.
- ✅ Interface responsiva e moderna com Tailwind CSS.

---

## 🛠️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/thimisul/music-playlist.git
cd music-playlist
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis (consulte a [documentação do Spotify](https://developer.spotify.com/documentation/web-api/) para obter suas credenciais):

```env
NEXT_PUBLIC_BASE_URL=base-url
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REDIRECT_URI=base-url/api/auth/callback
LOCAL_VERIFY_URL=url-app
ADMIN_CODE=seu_codigo_de_acesso # código para acessar a área administrativa
```

> **Atenção:** Nunca compartilhe seu `ADMIN_CODE` ou `SPOTIFY_CLIENT_SECRET` publicamente.

---

## ▶️ Como Usar

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
2. Acesse [http://127.0.0.1:3000](http://127.0.0.1:3000) no navegador.
3. Para testes com a API do Spotify, use um domínio real em vez de `localhost`, pois o Spotify não aceita `localhost` como URI de redirecionamento.
4. Siga as instruções na tela para conectar sua conta Spotify Premium e começar a adicionar músicas à fila.

---

## 🔐 Autenticação

- É necessário possuir uma conta Spotify Premium.
- O login via OAuth 2.0 é realizado apenas pelo administrador/anfitrião.
- Os convidados não precisam autenticar no Spotify para sugerir músicas.
- Escopos utilizados: `user-modify-playback-state`, `user-read-playback-state`.

---

## ⚖️ Considerações Legais

- **Uso Comercial**: Este projeto é de caráter **educacional e pessoal**. Qualquer uso comercial deve seguir os [Termos de Uso da API do Spotify](https://developer.spotify.com/terms/) e pode exigir autorização da Spotify.
- **Direitos Autorais**: Este projeto **não hospeda nem distribui conteúdo protegido**. Todos os direitos de mídia (como capas, nomes de músicas e artistas) pertencem à Spotify ou aos respectivos detentores de direitos.
- **Conformidade com a API**: Este projeto utiliza a [Spotify Web API](https://developer.spotify.com/documentation/web-api/) de acordo com os termos da plataforma.

> **Este produto usa a API Web do Spotify, mas não é endossado, certificado ou aprovado pela Spotify.**

---

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma _issue_ ou envie um _pull request_ com sugestões, correções ou melhorias.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).

---
