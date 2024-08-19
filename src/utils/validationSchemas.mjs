export const createUserValidationSchema={
    //define field you wanna validate
    username:{
     isLength:{
        options:{
         min:5,
         max:32,
        },
        errorMessage:
        "Username must be between 5-32 characters",
     },
     notEmpty:{
        errorMessage:"Username cannot be empty",
     },
     isString:{
        errorMessage:"Username must be a string",
     },
    },
    age:{
     notEmpty:{
        errorMessage:"Must have an age",
     },
     isInt:{
        errorMessage:"Age must be an integer",
     },
     custom:{
        options: (value)=>value>5,
        errorMessage:"Age must be greater than 5",
     },
    }

}

export const getUsersValidationSchema={
   filter:{
      optional:true,
      isString:{
         errorMessage:"Must be a string",
      },
      notEmpty:{
         errorMessage:"Must not be empty",
      },
      isLength:{
         options:{
            min:3,
            max:10,
         },
         errorMessage:"Must be at least 3 characters but at most 10",
      },

   }
}