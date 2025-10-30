
<template>
  <div class="container">
    <header>
      <div class="logo">
        Eclats De Sagesse.
      </div>
      <nav class="navpage">
        <ul>
          <a href="">Home</a>
        </ul>
        <ul>
          <a href="">Favorite</a>
        </ul>
      </nav>
    </header>
    <main>
      <div class="card">
        <div  @click="isFavorite = !isFavorite" class="buttonfavorite">
            <button :style="{background: isFavorite?'#eecaa8':'#AF7D4F'}">mettre en Favorite</button>
        </div>

        <div class="citation">
          <div v-if="loading">Chargement...</div>

          <div v-else>
            <div>
              <p>{{ quoteText }}</p>
            </div>
          <div class="auteur">
              <p>{{ quoteAuthor }}</p>
          </div>
        </div>
      </div>
      </div>  
      <div class="buttonNav">
        <button >Prec</button>
        <button @click="getQuote">Next</button>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>
<script setup>

import { ref, onMounted } from 'vue'

const quoteText = ref({})
const quoteAuthor = ref({})
const loading = ref(true)
const isFavorite = ref(false)


async function getQuote() {
  loading.value = true
  quoteText.value = ''
  quoteAuthor.value = ''
  isFavorite.value = false
  try {
    const response = await fetch('/api/api/random')
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)

    const data = await response.json()
    console.log(data.citation.citation)

    if (data.citation.citation.length>0) {
      quoteText.value = data.citation.citation
      quoteAuthor.value = data.citation.infos.auteur
    } else {
      quoteText.value = "Aucune citation trouvée."
      quoteAuthor.value = ''
    }
  } catch (err) {
    quoteText.value = "Impossible de récupérer la citation : " + err.message
    quoteAuthor.value = ''
  }finally{
    loading.value = false
  }
}  

onMounted(() => {
  getQuote()
})

</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}


.container{
  height: 100lvh;
  background-color: #BB895A;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}
.buttonfavorite{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  height: 30px;
  width: 50px;
}
.buttonfavorite button{
  margin: 10px;
  padding: 3px;
  background-color: #AF7D4F;
  border-radius: 5px;
  cursor:pointer;
  transition: background-color 0.3s;
  font-size: 10px;
}
header{
  display: flex;
  padding: 30px 10%;
  justify-content: space-between;
  align-items: center;
  background-color:#AF7D4F ;
}
.navpage{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
a{
  color: black;
  text-decoration: none;
}
a:hover{
  color: #BB895A;
  text-decoration: none;
}
.logo{
  font-size:30px;
  font-weight: bold;
}

main{
  margin: 10px 14%;
}
.card{
  background-color: #ffff;
  height: 55lvh;
  padding:15px;
  border-radius: 30px;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.citation{
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  transition: 0.5s;
}
.auteur{
  padding: 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 15px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}
.buttonNav{
  display: flex;
  margin: 10px 25px;
  justify-content: space-around;
}
.buttonNav button{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  border-color: none;
  height: 35px;
  width: 40px;
  background-color: #AF7D4F;
  border-radius: 5px;
}
</style>
