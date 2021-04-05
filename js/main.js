const app = Vue.createApp({
    data: () => ({
        title: "Degradados ATM",
        firstColor: "#005400",
        secondColor: "#FFFAAA",
        orientation: 1,
    }),
    computed: {
        setColor(){
            let orien;            
            switch (parseInt(this.orientation)) {
                case 1:
                    orien = "right";
                    break;
                case 2:
                    orien = "left";
                    break;
                case 3:
                    orien = "top";
                    break;
                default:
                    orien = "bottom";
                    break;
            }
            return `background: linear-gradient(to ${orien}, ${this.firstColor}, ${this.secondColor});`;
        }
    }
});