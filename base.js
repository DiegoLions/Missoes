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