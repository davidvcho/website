with open('data.txt', 'r') as data:
	lines = data.readlines()

	result = []
	for l in lines:
		line = l[:-1]

		parts = line.split(' ')
		if parts[0].count('/') == 2:
			result.append(parts[0])

	print result