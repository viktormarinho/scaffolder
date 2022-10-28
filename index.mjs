import inquirer from 'inquirer'
import shell from 'shelljs'

if (!shell.which('git')) {
    shell.echo('This script requires git.');
    shell.exit(1);
}

const questions = [
    {
        type: "input",
        name: "projectName",
        message: "Choose your project name.",
        default: "my-project"
    },
    {
        type: "list",
        name: "template",
        message: "Choose your scaffolder template.",
        choices: ['react-client']
    }
]

inquirer.prompt(questions).then(answers => {
    const { projectName, template } = answers;

    shell.mkdir('./' + projectName)
    shell.cd('./' + projectName)
    shell.exec('git clone \
    --depth 1  \
    --filter=blob:none  \
    --sparse \
    https://github.com/viktormarinho/scaffolder . ')

    shell.exec('git sparse-checkout set ' + template)

    shell.cp('-R', `./${template}/*`, './')
    shell.rm('-rf', `./${template}/`)
    shell.rm('-rf', 'package-lock.json')

    shell.rm('-rf', './.git')
    shell.sed('-i', template, projectName, 'package.json')

    console.log('All done. You can now run')
    console.log('cd ' + projectName)
    console.log('npm install')
    console.log('npm run dev')
})