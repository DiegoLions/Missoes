const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let missoes = []; 

function menu() {
    console.log('<<<<<<GERENCIADOR DE MISSÕES ESPACIAIS>>>>>');
    console.log('1. Adicionar missão ao gerenciador');
    console.log('2. Listar missões cadastradas');
    console.log('3. Editar informações das missões cadastradas');
    console.log('4. Marcar missão como concluída');
    console.log('5. Filtrar missão por prioridade');
    console.log('6. Ranking de Destinos');
    console.log('7. Listar por Tripulante');
    console.log('8. Sair do Gerenciador');
    console.log('\n' + '='.repeat(30));

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarMissaoAoGerenciador();
                break;
            case '2':
                ListarMissoesCadastradas();
                break;
            case '3':
                EditarMissao();
                break;
            case '4':
                MarcarMissaoComoConcluida();
                break;
            case '5':
                FiltrarPorPriodade();
                break;
            case '6':
                RankingDosDestinos();
                break;
            case '7':
                ListarPorTripulante();
                break;
            case '8':
                rl.close();
                console.log('Obrigado por usar o programa Gerenciador de Missões Espaciais. Até mais!!');
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                menu();
        }
    });
}

function adicionarMissaoAoGerenciador() {
    rl.question('Digite o nome da missão: ', (nome) => {
        rl.question('Digite o destino da missão, (ex: Marte, Júpiter, Saturno, etc.): ', (destino) => {
            rl.question('Digite a prioridade da missão de 1 a 5: ', (prioridade) => {
                if (prioridade <= 0 || isNaN(prioridade)) {
                    console.log('Prioridade inválida!!');
                    return adicionarMissaoAoGerenciador();
                }

                
                    function adicionartripulantes() {
                        let tripulantes = []; 
                        rl.question('Digite o nome do tripulante:', (tripulante) => {
                            tripulantes.push(tripulante)
                            console.log('Tripulante adicionado com sucesso!!');
                            console.log('Deseja adicionar outro tripulante?: (s/n)');
                            rl.question('', (resposta) => {
                                resposta.toLowerCase() === 's'
                                    ? adicionarTripulante()
                                    : menu();
                            })

                    const missao = {
                        nome,
                        destino,
                        prioridade: parseInt(prioridade),
                        tripulante,
                    };
                    missoes.push(missao);
                    console.log('Sua missão foi adicionado com sucesso!!');
                    console.log('Deseja adicionar outra missão?: (s/n)');

                    rl.question('', (resposta) => {
                        resposta.toLowerCase() === 's'
                            ? adicionarMissaoAoGerenciador()
                            : menu();
                    });
                });
            }
        });
        });
    });
}


function ListarMissoesCadastradas() {
    if (missoes.length === 0) { 
        console.log('Nenhum missão cadastrada no gerenciador.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    console.log('\n=== MISSOES CADASTRADAS ===');
    missoes.forEach((missao, index) => {
        console.log(`${index + 1}. Nome: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulante}`);
    });

    console.log('\nPressione Enter para retornar ao menu...');
    rl.question('', menu);


}

function editarMissao() {
    if (missao.length === 0) { 
        console.log('Nenhuma missão para editar.');
        console.log('\nPresione Enter para voltar ao menu...');
        rl.question('', () => menu());
    } else {
        console.log('\n=== MISSÕES CRIADAS ===');
        missoes.forEach((missao, index) => { 
            console.log(
                `${index + 1}. Missão: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulantes}`
            );
        });

        rl.question('\nDigite o número da missão que você deseja editar: ', (num) => {
            const index = parseInt(num, 10) - 1;
            if (index < 0 || index >= missoes.length) { 
                console.log('Número inválido');
                console.log('\nPresione Enter para voltar ao menu...');
                rl.question('', () => menu());
            } else { 
                rl.question('Digite o nome da missão: ', (nome) => {
                    rl.question('Escolha o destino da sua missão: ', (destino) => {
                        rl.question('Prioridade da missão (1-5): ', (prioridade) => {
                            rl.question('Adicione os tripulantes para essa missão: ', (tripulantes)  => {
                                missoes[index] = { 
                                    nome,
                                    destino,
                                    prioridade,
                                    tripulantes,
                                };
                                console.log('Missão editada com sucesso!');
                                console.log('\nPressione Enter para voltar ao menu...');
                                rl.question('', () => menu()); 
                            });
                        });
                    });
                });
            }
        });
    }
}


function missoesConcluidas() {
    if (missoes.length === 0) {
      console.log('Nenhuma missão foi adicionada.');
      console.log('\nPressione Enter para voltar ao menu.');
      return rl.question('', () => menu());
    }

    console.log('\n=== Missões ===');
    missoes.forEach((missao, index) => {
      const status = missao.concluida ? 'Concluído' : 'Pendente';
      console.log(
        `${index + 1}. Missão: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulantes} | Status: ${status}`
    );
    });

    rl.question('\nDigite o número da missão que deseja marcar como concluída: ', (num) => {
      const index = parseInt(num, 10) - 1;

      if (index < 0 || index >= missoes.length) {
        console.log('Essa missão não existe!');
        console.log('\nPressione Enter para voltar ao menu...');
        return rl.question('', () => menu());
      } else {
        missoes[index].concluido = true;

        console.log('Status editado com sucesso!');
        console.log('\nPressione Enter para voltar ao menu...');
        rl.question('', () => menu());
      }
    });
}

function filtroPrioridade (){
    if (missoes.length === 0) {
        console.log('Nenhuma missão registrada.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    rl.question('Por qual nivel de prioridade você deseja filtrar? ', (filtroPrioridade) => {
        let missoesFiltradas = []; 

        for (let i = 0; i < missoes.length; i++) {
            const missao = missoes[i]; 
            if (missao.prioridade.includes(filtro)) {
                missoesFiltradas.push(missao); 
            }
        }

        if (missoesFiltradas.length === 0) {
            console.log(`Não existe nenhuma missao no  nivel "${filtroPrioridade}"`);
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        } else {
            console.log(`\n=== MISSÕES DE NÍVEL "${filtro}" ===`);
            missoesFiltradas.forEach((missao, index) => {
                console.log(`${index + 1}. Nome: ${nome} | Destino: ${destino} | Tripulantes: ${tripulantes}`);
            });
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        }
    });
}

function verificarDestino (){
    if (missoes.length === 0) {
        console.log('Nenhuma missão registrada.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    rl.question('Deseja verificar quantas missões existem em qual destino? ', (filtrarDestino) => {

        let contador = 0

        for (let i = 0; i < missoes.length; i++) {
            const missao = missoes[i]; 
            if (missao.destino.includes(filtrarDestino)) {
                contador++
            }
        }

        if (contador === 0) {
            console.log(`Não existe nenhuma missão no  nivel "${filtrarDestino}"`);
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        } else {
            console.log(`\n=== MISSÕES EM ${filtrarDestino.toUpperCase} ===`);
            console.log(`\nExistem ${contador} missões neste destino.`);

            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        }
    });
}

const prompt = require("prompt-sync")();

function listarPorTripulante(missoes) {
  const nomeTripulante = prompt("Digite o nome do tripulante: ").toLowerCase();

  const missoesDoTripulante = missoes.filter(missao =>
    missao.tripulantes.some(tripulante => tripulante.toLowerCase() === nomeTripulante)
  );

  if (missoesDoTripulante.length === 0) {
    console.log(`Nenhuma missão encontrada para o tripulante "${nomeTripulante}".`);
  } else {
    console.log(`Missões com o tripulante "${nomeTripulante}":`);
    missoesDoTripulante.forEach((missao, index) => {
      console.log(`${index + 1}. ${missao.nome} - Destino: ${missao.destino}`);
    });
  }
}

function sair() {
    console.log("Programa finalizado. Até a próxima!");
    process.exit();
  }

menu();