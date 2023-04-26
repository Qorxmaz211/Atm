import inquirer from "inquirer";
import fs, { readFileSync } from 'fs';

const prompts=inquirer.createPromptModule();

/*balans goster*/

function showMyBalance () {
    const data = fs.readFileSync('./balans.txt', 'utf-8');

    if (!data.trim()) {
        return 0;
    }

    return data
        .trim()
        .split(',')
        .filter(str => str.trim().length > 0)
        .reduce((a, b) => parseFloat(a) + parseFloat(b));

}

// medaxil// 

function pulartir(amount){
    const dat=fs.readFileSync('nominallar.txt','utf-8');
    const myBalance=showMyBalance();
    if(myBalance>amount){
    fs.appendFileSync('./balans.txt',+amount+",",'utf-8');
    var ayir=dat.split(" ");
    var bazaarr=[];
    var bankarr=[];
    
   
    const numinal=[100,50,20,10,5,1];
    for(let i=0;i<numinal.length;i++){
        let say=Math.floor(amount/numinal[i]);
        var numinalqiymet=ayir[i].split("+")[0];
        var pullsayi=ayir[i].split("+")[1];
        var pullInt=parseInt(pullsayi);

        if(say<=pullInt){
            var numsay2=pullInt-say;
            var str=numinalqiymet+"+"+numsay2;
            bazaarr.push(str);
            bankarr.push(say);

            str="";
            amount=amount%numinal[i];
        }
    }
    var son_str=bazaarr.join(" ");
    fs.writeFileSync('./nominallar.txt', son_str,'utf-8');
    return bankarr;
}
}

/*mexaric*/

function pullchek(amount){
    const dat=fs.readFileSync('nominallar.txt','utf-8');
    const myBalance=showMyBalance();
    if(myBalance>amount){
    fs.appendFileSync('./balans.txt',-amount+",",'utf-8');
    var ayir=dat.split(" ");
    var bazaarr=[];
    var bankarr=[];

    const numinal=[100,50,20,10,5,1];
    for(let i=0;i<numinal.length;i++){
        let say=Math.floor(amount/numinal[i]);
        var numinalqiymet=ayir[i].split("-")[0];
        var pullsayi=ayir[i].split("-")[1];
        var pullInt=parseInt(pullsayi);

        if(say<=pullInt){
            var numsay2=pullInt-say;
            var str=numinalqiymet+"-"+numsay2;
            bazaarr.push(str);
            bankarr.push(say);

            str="";
            amount=amount%numinal[i];
        }
        else{
            return "Kifayət qədər vəsait yoxdur!";
        }
    }
    var son_str=bazaarr.join(" ");
    fs.writeFileSync('./nominallar.txt', son_str,'utf-8');
    return bankarr;
}
}

/*nominal*/

function see_numinal(){
    const data=fs.readFileSync('./nominallar.txt','utf-8');
    let numinal=data.split(" ");
    var arr=[];
    var nominallar=[100,50,20,10,5,1];
    for(let i=0;i<nominallar.length;i++){
        let say=numinal[i].split("-")[1];
        let str=nominallar[i]+" manat"+"-"+say+" ədəd";
        arr.push(str);
        str="";
    }
    return arr;
    
}

/*terminal*/

async function ishe_sal(){
    while(true){
        var netice=await prompts([
            {
                massage:'ne etmek isteyirsiniz',
                type:'list',
                choices:['Balansımı göstər','Mədaxil','Məxaric','<Bankomatdakı nominalların sayına baxmaq>'],
                name:"secim"
            }
        ]);
        switch(netice.secim){
            case 'Balansımı göstər':
            const balance = showMyBalance();
            console.log("Sizin balansiniz:", balance, '$');
            
            break;
           
            case 'Mədaxil':
                const  medaxil = await prompts([
                    {
                        message: 'Məbleği daxil edin:',
                        type: 'number',
                        name: 'amount'
                    }                                                                               
                ]);
                console.log(pulartir(medaxil.amount));
                console.log("Balansınız " +medaxil.amount+" azn artılırdı");
                break;

            case 'Məxaric':
                const mexaric = await prompts([
                    {
                        message: 'Məbleği daxil edin:',
                        type: 'number',
                        name: 'amount'
                    }
                ]);

                console.log(pullchek(mexaric.amount));
                console.log("Balansınız " +mexaric.amount+" azn artılırdı");
                break;
            case '<Bankomatdakı nominalların sayına baxmaq>':
                    const pul=see_numinal();
                    console.log(pul);
                    break;
        }
        const ask = await prompts([
            {
                message: 'Davam etmək isteyirsinizmi?',
                type: 'confirm',
                name: 'ask'
            }
        ]);

        if (!ask.ask) {
            console.log("Bizi seçdiyiniz üçün təşəkkürlər :)");
            break;
        }
    }
}
    
console.log(ishe_sal());