'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     //-----------Departamentos----------------------
     await queryInterface.bulkInsert('Departamento', [
      {
        nombre : "Lima",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
      {
        nombre : "Cuzco",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
      {
        nombre : "Junin",
        createdAt : new Date(), 
        updatedAt : new Date()
      }
    ])
    //-----------Provincias----------------------
    await queryInterface.bulkInsert('Provincia', [
      {
        nombre : "Lima",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 1
      },
      {
        nombre : "Cieneguilla",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 1
      },
      {
        nombre : "Paruro",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 2
      },
      {
        nombre : "Urubamba",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 2
      },
      {
        nombre : "Jauja",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 3
      },
      {
        nombre : "Tarma",
        createdAt : new Date(), 
        updatedAt : new Date(),
        id_dep : 3
      }
    ])
  //-----------Distritos----------------------
  await queryInterface.bulkInsert('Distrito', [
    {
      nombre : "San Borja",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 1
    },
    {
      nombre : "Jesús María",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 1
    },
    {
      nombre : "Cieneguilla",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 2
    },
    {
      nombre : "Accha",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 3
    },
    {
      nombre : "Omacha",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 3
    },
    {
      nombre : "Maras",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 4
    },
    {
      nombre : "Marco",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 5
    },
    {
      nombre : "Canchayllo",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 5
    },
    {
      nombre : "Acobamba",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_prov : 6
    }
  ])
  
  //-----------------Clientes-------------------------------
  await queryInterface.bulkInsert('Cliente', [
    {
      nombre : "Manuel Alejandro",
      apellido : "Lévano Palomino",
      dni : "05463260",
      correo : "manuel@gmail.com",
      numero : "984163051",
      direccion : "Las Magnolias 123",
      pep : true,
      estado : "Validado",
      contrasena : "barryallen",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_dep : 1,
      id_prov : 1,
      id_dist : 1
    },
    {
      nombre : "José Carlos",
      apellido : "Castro Montenegro",
      dni : "70516138",
      correo : "jose@gmail.com",
      numero : "983491081",
      direccion : "Pirandello 150",
      pep : true,
      estado : "Validado",
      contrasena : "bobesponja",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_dep : 1,
      id_prov : 1,
      id_dist : 1
    },
    {
      nombre : "Andrea Jimena",
      apellido : "La Rosa Girón",
      dni : "62058432",
      correo : "andrea@gmail.com",
      numero : "931540298",
      direccion : "Zorritos 1200",
      pep : true,
      estado : "Validado",
      contrasena : "mariposa",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_dep : 1,
      id_prov : 1,
      id_dist : 1
    }
  ])
  
  //--------- Categoria---------------------
  await queryInterface.bulkInsert('Categoria', [
    {
      nombre : "Futbol",
      createdAt : new Date(), 
      updatedAt : new Date()
    },
    {
      nombre : "Baloncesto",
      createdAt : new Date(), 
      updatedAt : new Date()
    },
    {
      nombre : "Hockey",
      createdAt : new Date(), 
      updatedAt : new Date()
    }
  ])
  //--------- Juego---------------------
  await queryInterface.bulkInsert('Juego', [
    {
      nombre : "Elimnatorias Sudamerica Qatar 2022",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria : 1
    },
    {
      nombre : "Champions League",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria :  1
    },
    {
      nombre : "NBA",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria : 2
    }
  ])
  //--------- Partida---------------------
  await queryInterface.bulkInsert('Partida', [
    {
      fecha : "29/11/2021",
      hora_inicio : "2021-11-29 03:14:07",
      duracion : 90,
      factor_A : 3.20,
      factor_B : 1.45,
      factor_X : 2.00,
      equipo_A : "Peru",
      equipo_B : "Colombia",
      estado : "pendiente",
      resultado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria : 1,
      id_juego : 1
    },
    {
      fecha : "30/11/2021",
      hora_inicio : "2021-11-30 03:14:07",
      duracion : 90,
      factor_A : 10.00,
      factor_B : 1.30,
      factor_X : 4.50,
      equipo_A : "Sheriff Tiraspol",
      equipo_B : "Bayern Munich",
      estado : "pendiente",
      resultado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria : 1,
      id_juego : 2
    },
    {
      fecha : "28/11/2021",
      hora_inicio : "2021-11-28 03:14:07",
      duracion : 90,
      factor_A : 2.00,
      factor_B : 2.95,
      factor_X : 2.30,
      equipo_A : "Argentina",
      equipo_B : "Brasil",
      estado : "pendiente",
      resultado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_categoria : 1,
      id_juego : 1
    }
  ])
  //--------- Apuesta---------------------
  await queryInterface.bulkInsert('Apuesta', [
    {
      fecha_hora : "29/11/2021",
      numero : 1,
      resultado_Apostado : 350,
      monto : 3.50,
      estado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_partida : 1
    },
    {
      fecha_hora : "30/11/2021",
      numero : 2,
      resultado_Apostado : 200,
      monto : 20,
      estado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_partida : 2
    },
    {
      fecha_hora : "28/11/2021",
      numero : 3,
      resultado_Apostado : 130,
      monto : 2.10,
      estado : "pendiente",
      createdAt : new Date(), 
      updatedAt : new Date(),
      id_partida : 3
    }
  ])
  //--------- Banners---------------------
  await queryInterface.bulkInsert('Banners', [
    {
      nombre : "banner_cocacola",
      estado : true,
      url : "https://www.cocacolaespana.es/content/dam/one/es/es/lead/logo-coca-cola-1.jpg",
      url_destino : "https://www.cocacoladeperu.com.pe/",
      createdAt : new Date(), 
      updatedAt : new Date()
    },
    {
      nombre : "banner_barcelona",
      estado : true,
      url : "ttps://www.fcbarcelona.es/photo/2018/11/20/834ece80-df2a-489c-83c6-dae087b73f4d/Camp-Nou.jpg",
      url_destino : "https://www.fcbarcelona.es/es/",
      createdAt : new Date(), 
      updatedAt : new Date()
    },
    {
      nombre : "banner_realmadrid",
      estado : true,
      url : "https://p4.wallpaperbetter.com/wallpaper/241/367/713/real-madrid-wallpaper-preview.jpg",
      url_destino : "https://www.realmadrid.com/",
      createdAt : new Date(), 
      updatedAt : new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Departamento', null, {})
     await queryInterface.bulkDelete('Provincia', null, {})
     await queryInterface.bulkDelete('Distrito', null, {})
     await queryInterface.bulkDelete('Cliente', null, {})
     await queryInterface.bulkDelete('Categoria', null, {})
     await queryInterface.bulkDelete('Juego', null, {})
     await queryInterface.bulkDelete('Partida', null, {})
     await queryInterface.bulkDelete('Apuesta', null, {})
     await queryInterface.bulkDelete('Banners', null, {})
  }
};
