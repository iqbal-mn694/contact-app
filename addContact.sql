-- menampilkan semua kontak

SELECT c.*, g.*, l.*
FROM contact c
LEFT JOIN `group` g ON c.groupId = g.id
LEFT JOIN label l ON c.labelId = l.id
WHERE c.deletedAt IS NULL
AND c.blacklist = false;

-- menampilkan sampah
SELECT c.*, g.*, l.*
FROM contact c
LEFT JOIN `group` g ON c.groupId = g.id
LEFT JOIN label l ON c.labelId = l.id
WHERE c.deletedAt IS NOT NULL;


-- Menampilkan hanya satu jenis group jika terdapat yang duplicate
SELECT DISTINCT group_name, *
FROM `group`;

-- menampilkan kontak berdasarkan group
SELECT c.*, g.*, l.*
FROM contact c
LEFT JOIN `group` g ON c.groupId = g.id
LEFT JOIN label l ON c.labelId = l.id
WHERE c.deletedAt IS NULL
AND g.group_name = group_name

-- menampilkan kontak yang diblacklist
SELECT c.*, g.*, l.*
FROM contact c
LEFT JOIN `group` g ON c.groupId = g.id
LEFT JOIN label l ON c.labelId = l.id
WHERE c.deletedAt IS NULL
AND c.blacklist = true;

SELECT * FROM label;



