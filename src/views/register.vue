<template>
  
  <div class="container">
    <form @submit.prevent="register">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email address..."
        v-model="email"
      />
      <input
        type="password"
        placeholder="password..."
        v-model="password"
      />
      <button type="submit">Register</button>
    </form>
  </div>

</template>

<script>
  import firebase from 'firebase/compat/app';
  // import firebase from 'firebase'
  // require('firebase/auth')
  // import firebase from 'firebase';

  export default{
    data() { 
      return { 
        email: '', 
        password: '', 
      }; 
    },

    methods: {
      register() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
                alert('Successfully registered! Please login.');
                this.$router.push('/');
            })
            .catch(error => {
                alert(error.message);
            });
      },
    },

  }
</script>


<style>
  .container{
    margin: 100px;
  }
</style>