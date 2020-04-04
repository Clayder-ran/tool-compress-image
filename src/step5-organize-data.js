const { saveToJson, CWD, getInput, print, chalk, log, prompts } = require('../func/index');

let i = 0;
module.exports = async function(images) {
	if (Array.isArray(images) && images.length) {
		let choices = images.map((item, index) => ({ title: item.key, value: index, description: item.fullPath }));
		// console.log('* images', images);

		let selectItems = await prompts(
			{
				type: 'multiselect',
				name: 'indexs',
				choices,
				message: chalk.cyan('选择图片： '),
				optionsPerPage: 20,
				hint: 'hint',
				warn: 'warn',
        instructions: chalk.gray(`\n  (1.切换:上下方向键;  2.选择:空格键/右向键;  3.确认:回车键;)`),
				// mask: 'mask',
				onRender(kleur, b) {
					// this.cursor  /* 当前光标选中项 */
					// this.value /* 当前项目的(选中)状态 */
					let items = this.value.filter((item) => !!item.selected).map((item) => item.title);
					this.hint = chalk.yellow(items.length ? '✔' : '?')+ '  ' + chalk.white(items.join(' | '));
					// console.log('* this', this.value)

					// this.firstRender
					// this.scrollIndex
					// this.msg = i++
					// this.instructions = i++
					// this.hint = `选中项: ${this.cursor}`
				},

				// suggest: (input, choices) => {
				//   /* 过滤规则: 包含, 非首相同 */
				//   console.log('* ', input)
				//   return Promise.resolve(choices.filter(i => i.title.includes(input)))
				// },
				onState(res) {
					// console.log('* res', res)
				},
			},
			{
				onCancel() {
					process.exit();
				},
			}
		).then(({ indexs = [] }) => indexs.map((i) => images[i]));

		// console.log('* selectItems', selectItems)
		return selectItems;
	} else {
		return Promise.reject({ msg: '未查找到图片, 结束' });
	}
}


