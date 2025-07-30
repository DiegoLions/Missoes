#Gerenciador de Missões Espaciais




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
        console.log( destinosContagem[destino])
        if ( destinosContagem[destino] == 1) {
            console.log(`- ${destino}: ${destinosContagem[destino]} missão`)
        }else {
            console.log(`- ${destino}: ${destinosContagem[destino]} missões`);
        }
    }

    console.log('\nPressione Enter para retornar ao menu...');
    rl.question('', menu);
}




const status = missao.concluida ? 'Concluída' : 'Pendente';
