const generateCircle = (size:number, color:string) :HTMLElement => {
    const span = document.createElement('span');
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.borderRadius = `50%`;
    span.style.display = 'inline-block';
    span.style.backgroundColor = color;
    return span;
}

const colors:Array<string> = ['red','green','blue'];

const root = document.querySelector("#root");

colors.forEach(color=> root.appendChild(generateCircle(50,color)))
