class File {
  constructor(_name) {
    this.name = _name;
  }

  display () {
    console.log(this.name);
  }
}

class Directory {
  constructor (_name) {
    this.name = _name;
    this.files = [];
  }

  add (file) {
    this.files.push(file);
  }

  remove (_file) {
    let beforeCnt = this.files.length;
    this.files = this.files.filter(file => file.name !== _file.name);
    let afterCnt = this.files.length;

    return beforeCnt === afterCnt;
  }

  getFileName (_idx) {
    return this.files[_idx].name
  }

  display () {
    console.log(this.name);
    this.files.forEach((file, idx)  => {
      console.log(`  ${this.getFileName(idx)}`) // file.name
    })
  }
}

const directoryOne = new Directory('Directory One');
const directoryTwo = new Directory('Directory Two');
const directoryThree = new Directory('Directory Three');

const fileOne = new File('File One');
const fileTwo = new File('File Two');
const fileThree = new File('File Three');

directoryOne.add(fileOne);
directoryOne.add(fileTwo);

directoryTwo.add(fileOne);

directoryThree.add(fileOne);
directoryThree.add(fileTwo);
directoryThree.add(fileThree);

directoryOne.display();
directoryTwo.display();
directoryThree.display();