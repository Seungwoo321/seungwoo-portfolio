'use client';

import { Container, Title, Grid, Card, Text, Progress, Group, ThemeIcon } from '@mantine/core';
import { IconCode, IconDatabase, IconCloud } from '@tabler/icons-react';
import { skills } from '@/constants/portfolio-data';

const categoryInfo = {
  expert: { label: 'Expert', color: 'blue', icon: IconCode, threshold: 80 },
  proficient: { label: 'Proficient', color: 'green', icon: IconDatabase, threshold: 60 },
  experienced: { label: 'Experienced', color: 'orange', icon: IconCloud, threshold: 40 },
};

export default function SkillsSection() {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-32 md:py-40 bg-portfolio-surface">
      <Container size="lg">
        <Title order={2} className="text-4xl md:text-5xl font-bold mb-6 text-center">
          기술 스택
        </Title>
        <Text size="lg" c="dimmed" className="text-center mb-12 md:mb-16">
          10년간 축적된 기술 전문성
        </Text>

        <Grid>
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const info = categoryInfo[category as keyof typeof categoryInfo];
            const Icon = info.icon;
            
            return (
              <Grid.Col key={category} span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" className="h-full">
                  <Group className="mb-4">
                    <ThemeIcon size="lg" color={info.color} variant="light">
                      <Icon size={24} />
                    </ThemeIcon>
                    <Text size="lg" fw={700}>{info.label}</Text>
                  </Group>

                  <div className="space-y-5">
                    {categorySkills.map((skill) => (
                      <div key={skill.name}>
                        <Group justify="space-between" className="mb-2">
                          <Text size="sm" fw={500}>{skill.name}</Text>
                          {skill.years && (
                            <Text size="xs" c="dimmed">{skill.years}년</Text>
                          )}
                        </Group>
                        <Progress
                          value={
                            info.threshold + 
                            ((skill.years || 1) / 10) * (100 - info.threshold)
                          }
                          color={info.color}
                          size="sm"
                          radius="xl"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
}