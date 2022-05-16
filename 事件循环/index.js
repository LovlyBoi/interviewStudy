setTimeout(() => {
    console.log(1);
    a();
}, 0)

function a() {
    setTimeout(() => {
        console.log(2);
    }, 0);
    console.log(3);
}

a();

console.log(4);


// 3
// 4 
// 1
// 3
// 2
// 2