/**
 * Добавление элементов на экран
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function CreateElements() {
     elements = [],
        factory = new NElementFactory()
    ;

    this.addElement = function(id) {
        elements.push(factory.createElement({ method:'rect', color:'red', x:0, y:0, realWidth:10, realHeight:10, speedX:0, speedY:0, is_killed:0, is_crash:0, is_attack:0}));

        elements[0].drawing();
        elements[0].draggable = true;
        console.log(elements);
        console.log(id);
    }
}