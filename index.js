window.addEventListener('load', function () {
    let objBase = [
        {
            id: 1,
            baseName : 'corvette'
        },
        {
            id: 2,
            baseName : 'buggatti'
        },
        {
            id: 3,
            baseName : 'mercedes'

        },
        {
            id: 4,
            baseName : 'bentley'
        },
        {
            id: 5,
            baseName : 'lamborghini'
        },
        {
            id: 6,
            baseName : 'aston-martin'
        }
    ]
    let head = createElem('header', 'head');
    head.innerText = "Your Result";
    root.append(head);
    root.append(renderDivs(objBase));
    let arrId = []
    let arrBaseId = []
    let targets = []
    let wrapper = document.querySelector('.wrapper');
    let header = document.querySelector('header');
    wrapper.addEventListener('click', function (e) {
        let target = e.target;
        if(!target.classList.contains('item') ) return;
        rotate(target,0);
        setTimeout(() => {
            target.src = `/images/${target.dataset.id}.jpg`
        },1000)
        arrId.push(target.dataset.id);
        arrBaseId.push(target.dataset.baseId);
        targets.push(target)
        if(arrId.length === 2){
            let classList = header.classList;
            if(isEqual(arrBaseId)){ 
                header.innerText = 'Selected same element';
                classList.add('same');
                setTimeout (() => {
                    classList.remove('same');
                    header.innerText = 'Your Result';
                }, 3500)
            }
            else if(isEqual(arrId) && !isEqual(arrBaseId)){
                header.innerText = 'WIN';
                    if(classList.contains('wrong')) {
                        classList.remove('wrong')
                    } 
                    classList.add('win')
                setTimeout (() => {
                    classList.remove('win');
                    header.innerText = 'Your Result';
                }, 3500)
                
            }else{
                header.innerText = 'Wrong';
                    if(classList.contains('win')) {
                        classList.remove('win')
                    }
                    classList.add('wrong')
                    setTimeout (() => {
                        classList.remove('wrong');
                        header.innerText = 'Your Result';
                    },3500)
            }
            targets.forEach(item => {
                setTimeout(() => {
                    rotate(item, 180);
                    setTimeout(() => {
                        item.src = `images/base.jpg` 
                    },1000)
                    targets = [];
                    arrId = [];
                    arrBaseId = [];
                }, 3500)
            })
        }
    })
    
    
})


function renderDivs(arr) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    for (let i = 0; i < 3; i++) {
        let arrShuffled = shuffle(arr)
        for (let j = 0; j < arr.length; j++) {
            let items = createElem('div','items');
            let img = document.createElement('img');
            img.src = `images/base.jpg`;
            img.dataset.id = arrShuffled[j].id;
            img.dataset.baseId = `${arrShuffled[j].baseName}-${i}`;
            img.classList.add('item');
            items.appendChild(img)
           wrapper.appendChild(items)
        }
        
    }
    return wrapper
}

function createElem(arg1,arg2) {
    let elem = document.createElement(arg1);
    elem.classList.add(arg2);
    return elem
}
function rotate(elem,deg) {
    elem.style.transform = `rotateX(${deg}deg)`;
    return elem
}

function isEqual(arg1) {
    let [a, b] = arg1;
    return a === b; 
}


function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5)
}