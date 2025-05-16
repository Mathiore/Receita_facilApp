export const mockRecipes = [
  {
    id: 1,
    title: 'Macarrão ao Molho Branco',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    timeMinutes: 35,
    servings: 4,
    difficulty: 'fácil',
    dietaryTags: ['vegetariano'],
    ingredients: [
      { name: 'Macarrão', quantity: '500g' },
      { name: 'Leite', quantity: '500ml' },
      { name: 'Creme de leite', quantity: '1 caixa' },
      { name: 'Manteiga', quantity: '3 colheres de sopa' },
      { name: 'Farinha de trigo', quantity: '2 colheres de sopa' },
      { name: 'Cebola', quantity: '1 unidade' },
      { name: 'Alho', quantity: '2 dentes' },
      { name: 'Queijo parmesão', quantity: '100g' },
      { name: 'Sal', quantity: 'a gosto' },
      { name: 'Pimenta', quantity: 'a gosto' },
      { name: 'Noz-moscada', quantity: 'uma pitada' }
    ],
    steps: [
      'Cozinhe o macarrão em água fervente com sal até ficar al dente. Escorra e reserve.',
      'Em uma panela, refogue a cebola e o alho na manteiga até ficarem dourados.',
      'Adicione a farinha de trigo e mexa bem até formar uma pasta.',
      'Acrescente o leite aos poucos, sempre mexendo para não formar grumos.',
      'Quando engrossar, adicione o creme de leite e o queijo ralado.',
      'Tempere com sal, pimenta e noz-moscada.',
      'Misture o molho ao macarrão já cozido e sirva quente.'
    ],
    tips: 'Para um molho mais liso, você pode bater no liquidificador. Se quiser um toque especial, adicione cubos de presunto ou bacon.'
  },
  {
    id: 2,
    title: 'Bolo de Chocolate',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    timeMinutes: 45,
    servings: 8,
    difficulty: 'médio',
    dietaryTags: ['vegetariano'],
    ingredients: [
      { name: 'Farinha de trigo', quantity: '2 xícaras' },
      { name: 'Açúcar', quantity: '1 e 1/2 xícaras' },
      { name: 'Cacau em pó', quantity: '1 xícara' },
      { name: 'Fermento em pó', quantity: '1 colher de sopa' },
      { name: 'Bicarbonato de sódio', quantity: '1 colher de chá' },
      { name: 'Sal', quantity: '1/2 colher de chá' },
      { name: 'Ovos', quantity: '2 unidades' },
      { name: 'Leite', quantity: '1 xícara' },
      { name: 'Óleo', quantity: '1/2 xícara' },
      { name: 'Água quente', quantity: '1 xícara' },
      { name: 'Essência de baunilha', quantity: '1 colher de chá' }
    ],
    steps: [
      'Pré-aqueça o forno a 180°C e unte uma forma redonda.',
      'Em uma tigela grande, misture os ingredientes secos: farinha, açúcar, cacau, fermento, bicarbonato e sal.',
      'Adicione os ovos, leite, óleo e baunilha, batendo em velocidade média por cerca de 2 minutos.',
      'Por último, acrescente a água quente à massa. A massa ficará bem líquida, mas é normal.',
      'Despeje a massa na forma preparada.',
      'Asse por 30-35 minutos, ou até que um palito inserido no centro saia limpo.',
      'Deixe esfriar antes de desenformar e decorar com a cobertura de sua preferência.'
    ],
    tips: 'Para uma cobertura fácil, derreta 200g de chocolate meio amargo com 2 colheres de manteiga em banho-maria ou no micro-ondas.'
  },
  {
    id: 3,
    title: 'Salada de Quinoa',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    timeMinutes: 25,
    servings: 2,
    difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'sem glúten', 'low carb'],
    ingredients: [
      { name: 'Quinoa', quantity: '1 xícara' },
      { name: 'Água', quantity: '2 xícaras' },
      { name: 'Pepino', quantity: '1/2 unidade' },
      { name: 'Tomate cereja', quantity: '1 xícara' },
      { name: 'Cebola roxa', quantity: '1/4 unidade' },
      { name: 'Hortelã', quantity: '1/4 xícara' },
      { name: 'Salsa', quantity: '1/4 xícara' },
      { name: 'Limão', quantity: '1 unidade' },
      { name: 'Azeite de oliva', quantity: '3 colheres de sopa' },
      { name: 'Sal', quantity: 'a gosto' },
      { name: 'Pimenta', quantity: 'a gosto' }
    ],
    steps: [
      'Lave bem a quinoa em água corrente usando uma peneira fina.',
      'Em uma panela, adicione a quinoa e a água, leve ao fogo alto até ferver.',
      'Reduza o fogo, tampe a panela e cozinhe por cerca de 15 minutos.',
      'Desligue o fogo e deixe a quinoa descansar por 5 minutos, ainda tampada.',
      'Solte a quinoa com um garfo e transfira para uma tigela grande. Deixe esfriar.',
      'Corte o pepino, os tomates e a cebola em pedaços pequenos.',
      'Pique finamente as ervas.',
      'Adicione os vegetais e as ervas à quinoa já fria.',
      'Tempere com suco de limão, azeite, sal e pimenta.',
      'Misture bem e sirva em seguida.'
    ],
    tips: 'Para deixar a salada mais completa, adicione proteína como grão-de-bico, queijo feta ou peito de frango desfiado.'
  },
  {
    id: 4,
    title: 'Arroz com Frango',
    image: 'https://images.pexels.com/photos/5710178/pexels-photo-5710178.jpeg',
    timeMinutes: 40,
    servings: 4,
    difficulty: 'médio',
    dietaryTags: ['sem glúten'],
    ingredients: [
      { name: 'Arroz', quantity: '2 xícaras' },
      { name: 'Peito de frango', quantity: '500g' },
      { name: 'Cebola', quantity: '1 unidade' },
      { name: 'Alho', quantity: '3 dentes' },
      { name: 'Cenoura', quantity: '1 unidade' },
      { name: 'Ervilhas', quantity: '1/2 xícara' },
      { name: 'Milho', quantity: '1/2 xícara' },
      { name: 'Óleo', quantity: '3 colheres de sopa' },
      { name: 'Sal', quantity: 'a gosto' },
      { name: 'Pimenta', quantity: 'a gosto' },
      { name: 'Água', quantity: '4 xícaras' }
    ],
    steps: [
      'Corte o peito de frango em cubos pequenos e tempere com sal e pimenta.',
      'Em uma panela grande, aqueça o óleo e doure o frango em fogo médio-alto.',
      'Adicione a cebola e o alho picados e refogue até ficarem dourados.',
      'Junte a cenoura cortada em cubos pequenos e refogue por mais 2 minutos.',
      'Acrescente o arroz e mexa bem para envolver todos os ingredientes.',
      'Adicione a água fervente e tempere com sal a gosto.',
      'Quando começar a ferver, abaixe o fogo, tampe a panela e deixe cozinhar por cerca de 15 minutos.',
      'Quando a água estiver quase toda absorvida, adicione as ervilhas e o milho.',
      'Tampe novamente e cozinhe por mais 5 minutos, ou até que o arroz esteja cozido e a água totalmente absorvida.',
      'Desligue o fogo e deixe descansar por 5 minutos antes de servir.'
    ],
    tips: 'Você pode substituir a água por caldo de galinha para um sabor mais intenso. Para uma versão mais cremosa, adicione 1/2 xícara de creme de leite no final do cozimento.'
  },
  {
    id: 5,
    title: 'Omelete de Legumes',
    image: 'https://images.pexels.com/photos/7655167/pexels-photo-7655167.jpeg',
    timeMinutes: 15,
    servings: 1,
    difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'sem glúten', 'low carb'],
    ingredients: [
      { name: 'Ovos', quantity: '3 unidades' },
      { name: 'Cebola', quantity: '1/4 unidade' },
      { name: 'Pimentão', quantity: '1/4 unidade' },
      { name: 'Tomate', quantity: '1/2 unidade' },
      { name: 'Espinafre', quantity: '1/2 xícara' },
      { name: 'Queijo ralado', quantity: '2 colheres de sopa' },
      { name: 'Azeite de oliva', quantity: '1 colher de sopa' },
      { name: 'Sal', quantity: 'a gosto' },
      { name: 'Pimenta', quantity: 'a gosto' }
    ],
    steps: [
      'Bata os ovos em uma tigela e tempere com sal e pimenta.',
      'Pique a cebola, o pimentão, o tomate e o espinafre em pedaços pequenos.',
      'Aqueça o azeite em uma frigideira antiaderente em fogo médio.',
      'Adicione a cebola e o pimentão e refogue por 2 minutos.',
      'Acrescente o tomate e o espinafre e cozinhe por mais 1 minuto.',
      'Despeje os ovos batidos sobre os legumes.',
      'Quando a base começar a firmar, adicione o queijo ralado.',
      'Cozinhe até que os ovos estejam quase totalmente firmes.',
      'Dobre ao meio com ajuda de uma espátula e sirva imediatamente.'
    ],
    tips: 'Para uma omelete mais fofa, adicione uma colher de sopa de água gelada à mistura de ovos. Você pode variar os legumes de acordo com o que tiver disponível.'
  }
];