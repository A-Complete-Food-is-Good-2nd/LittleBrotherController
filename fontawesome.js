import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faChevronUp, faChevronRight, faChevronLeft, faChevronDown, faLongArrowAltUp, faLongArrowAltDown, faUndoAlt, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';

// 下記URLからアイコンを選んで読み込む
// https://fontawesome.com/icons?d=gallery&m=free

//使用するアイコンをaddすべし
library.add(faChevronUp, faChevronRight, faChevronLeft, faChevronDown, faLongArrowAltUp, faLongArrowAltDown,  faUndoAlt, faRedoAlt);

dom.i2svg();