import 'brace/mode/tex';
import 'brace/theme/monokai';
import 'brace/ext/searchbox';

export class CustomHighlightRules extends window.ace.acequire('ace/mode/text_highlight_rules')
	.TextHighlightRules {
	constructor() {
		super();
		this.$rules = {
			start: [
				{
					token: 'comment',
					regex: '[\\*]+'
				},
				{
					token: 'variable', // single line
					regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
				},
				{
					token: 'string', // single line
					regex: '"',
					next: 'string'
				},
				{
					token: 'keyword',
					regex: /(?:^|\W)(FAILED|FAIL|ERROR|false|False|FALSE)(?:$|\W)/
				},
				{
					token: 'variable.language',
					regex: /(?:^|\W)(SUCCESS|TRUE|True|true|passed successfully|updated successfully|removed successfully|successfully deleted|completed successfully|written Successfully|Successfully registered|imported successfully|successfully moved|Successfully configured|finished successfully|executed successfully|synced successfully|deployed successfully|Finished Successfully|added successfully|execution finished|successfully restarted|Instance successfully|successfully used|test past successfully|Successfully introspected|successfully|Successfully)(?:$|\W)/
				},
				{
					token: 'variable.language',
					regex: /([\s\t\r\n](\*{4}|\*{2})([^*]+)(\*{4}|\*{2}))/
				},
				{
					token: 'variable.parameter',
					regex: /(?:^|\W)(DEBUG|INFO|WELCOME|TOOL|TO|NODE|VALIDATION|REPORT|SUMMARY|DEBUG|WARNING|ACTIVE|UPDATE|COMPLETE|CUSTOM|PLAY|TASK|RECAP|RUNNING|HANDLER|DEFAULT|TLS|POST|IPMI|FULL|NOVL|IBRS|HEALTH|OK|CREATE|DELETE|EXPORT|PING|RUNNING|CBIS|HF|IN_PROGRESS|PROGRESS)(?:$|\W)/
				}
			],
			string: [
				{
					token: 'constant.language.escape',
					regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\bfnrt])/
				},
				{
					token: 'string',
					regex: '"|$',
					next: 'start'
				},
				{
					defaultToken: 'string'
				}
			]
		};
	}
}

export default class CustomTextMode extends window.ace.acequire('ace/mode/tex').Mode {
	constructor() {
		super();
		this.HighlightRules = CustomHighlightRules;
	}
}
