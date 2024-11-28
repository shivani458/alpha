let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
   
let turnO=true;//playerX,playerO

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [1,4,7],
    [2,4,6],
    [6,7,8],
    [2,5,8]
];
const resetGame=() => {
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");

}


boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
       if(turnO) { //playerO
        box.innerText="O";
        turnO=false;
       } else { //playerX
        box.innerText="X";
        turnO=true;
       }
       box.disabled=true;


       chechWinner();

    });

});
const disableBoxes =() =>{
    for(let box of boxes) {
        box.disabled =true;
    }
};
const enableBoxes =() =>{
    for(let box of boxes) {
        box.disabled =false;
        box.innerText="";
    }
};
const showWinner =(winner) =>{
    msg.innerText='Congratulations';
    msgContainer.classList.remove("hide");
    disableBoxes ();
};
    const chechWinner=()=>{
    for( let pattern of winPatterns){
        //  console.log(pattern[0],pattern[1],pattern[2]);
        //  console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);/
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val !=""&& pos2Val !=""&& pos3Val !="" ){
            if(pos1Val===pos2Val && pos2Val=== pos3Val){
                // console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
        }
      
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


  