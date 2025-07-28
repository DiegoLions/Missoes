const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let missoes = [];
let nomeAtual
let destinoAtual
let prioridadeAtual
let tripulantesAtuais = []


function menu() {
    console.log('\n<<<<<<GERENCIADOR DE MISSÕES ESPACIAIS>>>>>');
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
                FiltrarPorPrioridade();
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
    nomeAtual = '';
    destinoAtual = '';
    prioridadeAtual = 0;
    tripulantesAtuais = [];

    rl.question('Digite o nome da missão: ', (nome) => {
        nomeAtual = nome
        rl.question('Digite o destino da missão (ex: Marte, Júpiter, Saturno, etc.): ', (destino) => {
            destinoAtual = destino
            rl.question('Digite a prioridade da missão de 1 a 5: ', (prioridade) => {
                const prioridadeParsed = parseInt(prioridade);
                if (isNaN(prioridadeParsed) || prioridadeParsed < 1 || prioridadeParsed > 5) {
                    console.log('Prioridade inválida! Por favor, digite um número entre 1 e 5.');
                    adicionarMissaoAoGerenciador(); 
                } else {
                    prioridadeAtual = prioridadeParsed; 
                    perguntarTripulantes(); 
                }
            })
        })
    })
}

    function perguntarTripulantes() {
            rl.question("Adicionar um tripulante: ", (tripulante) =>{
                tripulantesAtuais.push(tripulante)
                console.log(tripulantesAtuais)
                rl.question("deseja adicionar outro tripulante? ", (res) => {
                if(res.toLowerCase() =='s'){
                    perguntarTripulantes()
                } else{
                    const missao = {
                        nome: nomeAtual,
                        destino: destinoAtual,
                        prioridade: prioridadeAtual,
                        tripulantes: tripulantesAtuais,
                        concluida: false,
                    }
                    missoes.push(missao)
                    console.log('Missão adicionada com sucesso!');
                    menu()
                }
                })
                } 
                )}
            
    
function ListarMissoesCadastradas() {
    if (missoes.length === 0) { 
        console.log('Nenhuma missão cadastrada no gerenciador.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    console.log('\n=== MISSOES CADASTRADAS ===');
    missoes.forEach((missao, index) => {
        console.log(`${index + 1}. Nome: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulantes}`)
    });

    console.log('\nPressione Enter para retornar ao menu...');

    rl.question('', menu);


}

function EditarMissao() {
    if (missoes.length === 0) { 
        console.log('Nenhuma missão cadastrada no gerenciador.');
        console.log('\nPresione Enter para voltar ao menu...');
        rl.question('', () => menu());
    } else {
        console.log('\n=== MISSÕES REGISTRADAS ===');
        missoes.forEach((missao, index) => { 
            console.log(
                `${index + 1}. Missão: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulantes}`
            );
        });

        rl.question('\nDigite o número da missão que você deseja editar: ', (num) => {
            const index = parseInt(num, 10) - 1;
            if (index < 0 || index >= missoes.length) { 
                console.log('Número inválido');
                console.log('\nPresione Enter para voltar ao menu');
                rl.question('', () => menu());
            } else { 
                rl.question('Digite o nome da missão: ', (nome) => {
                    nomeAtual = nome
                    rl.question('Digite o destino da missão (ex: Marte, Júpiter, Saturno, etc.): ', (destino) => {
                        destinoAtual = destino
                        rl.question('Digite a prioridade da missão de 1 a 5: ', (prioridade) => {
                            const prioridadeParsed = parseInt(prioridade);
                            if (isNaN(prioridadeParsed) || prioridadeParsed < 1 || prioridadeParsed > 5) {
                                console.log('Prioridade inválida! Por favor, digite um número entre 1 e 5.');
                                EditarMissao(); 
                            } else {
                                prioridadeAtual = prioridadeParsed;

                                tripulantesAtuais = []
                            
                                function editarTripulantes() {
                                    rl.question("Adicionar um tripulante: ", (tripulante) => {
                                        tripulantesAtuais.push(tripulante)
                                        console.log(tripulantesAtuais)
                                        rl.question("Deseja adicionar outro tripulante? (s/n): ", (res) => {
                                            if (res.toLowerCase() === 's') {
                                                editarTripulantes();
                                            } else {
                                                missoes[index].nome = nomeAtual;
                                                missoes[index].destino = destinoAtual;
                                                missoes[index].prioridade = prioridadeAtual;
                                                missoes[index].tripulantes = [tripulantesAtuais]

                                                console.log('Missão editada com sucesso!');
                                                menu()
                                            }
                                        });
                                    });
                                }
                                perguntarTripulantesParaEdicaoInterna(); // Start collecting tripulantes for editing
                            }
                        });
                    });
                });
            }
        });
    }
}

function MarcarMissaoComoConcluida() {
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
        missoes[index].concluida = true;

        console.log('Status editado com sucesso!');
        console.log('\nPressione Enter para voltar ao menu...');
        rl.question('', () => menu());
      }
    });
}

function FiltrarPorPrioridade() { 
    if (missoes.length === 0) {
        console.log('Nenhuma missão registrada.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    rl.question('Por qual nível de prioridade você deseja filtrar (1 a 5)? ', (filtroPrioridadeInput) => {

        const prioridadeDesejada = parseInt(filtroPrioridadeInput);

        if (isNaN(prioridadeDesejada) || prioridadeDesejada < 1 || prioridadeDesejada > 5) {
            console.log('Prioridade inválida! Por favor, digite um número entre 1 e 5.');
            return FiltrarPorPrioridade(); 
        }

        let missoesFiltradas = [];

        for (let i = 0; i < missoes.length; i++) {
            const missao = missoes[i];
            if (missao.prioridade === prioridadeDesejada) {
                missoesFiltradas.push(missao);
            }
        }

        if (missoesFiltradas.length === 0) {
            console.log(`Não existe nenhuma missão no nível "${prioridadeDesejada}".`);
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        } else {
            
            console.log(`\n=== MISSÕES DE NÍVEL DE PRIORIDADE "${prioridadeDesejada}" ===`);
            missoesFiltradas.forEach((missao, index) => {
                console.log(`${index + 1}. Nome: ${missao.nome} | Destino: ${missao.destino} | Tripulantes: ${missao.tripulantes.join(', ')} | Prioridade: ${missao.prioridade}`);
            });
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        }
    });
}

function RankingDosDestinos() {
    if (missoes.length === 0) {
        console.log('Nenhuma missão registrada.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    const destinosContagem = {};

    for (let i = 0; i < missoes.length; i++) {
        const missao = missoes[i];
        const destino = missao.destino;

        if (destinosContagem[destino]) {
            destinosContagem[destino]++
        } else {
            destinosContagem[destino] = 1
        }
    }

    console.log('\n=== MISSÕES POR DESTINO ===');

    for (const destino in destinosContagem) {
        console.log(`- ${destino}: ${destinosContagem[destino]} missões`);
    }

    console.log('\nPressione Enter para retornar ao menu...');
    rl.question('', menu);
}



function ListarPorTripulante() {
    if (missoes.length === 0) {
        console.log('Nenhuma missão registrada.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    rl.question('Deseja listar as missões de qual tripulante? ', (listarTripulantes) => {
        const termoLower = listarTripulantes.toLowerCase(); 
        let missoesDoTripulante = [];

        for (let i = 0; i < missoes.length; i++) {
            const missao = missoes[i];
            const tripulanteEncontrado = missao.tripulantes.some(t => t.toLowerCase().includes(termoLower));

            if (tripulanteEncontrado) {
                missoesDoTripulante.push(missao);
            }
        }

        if (missoesDoTripulante.length === 0) {
            console.log(`O tripulante "${listarTripulantes}" não está em nenhuma missão.`); 
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        } else {
            console.log(`\n=== MISSÕES DO TRIPULANTE "${listarTripulantes.toUpperCase()}" ===`);
            missoesDoTripulante.forEach((missao, index) => {
                const status = missao.concluida ? 'Concluída' : 'Pendente';
                console.log(`${index + 1}. Nome: ${missao.nome} | Destino: ${missao.destino} | Prioridade: ${missao.prioridade} | Tripulantes: ${missao.tripulantes.join(', ')} | Status: ${status}`); // Added .join(', ')
            });
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        }
    });
}

menu();