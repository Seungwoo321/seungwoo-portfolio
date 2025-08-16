'use client';

import { Container, Title, Text, Button, Group, Badge } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowDown } from '@tabler/icons-react';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center">
      <Container size="lg" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name & Title */}
          <Title 
            order={1} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            이승우
          </Title>
          
          <Text className="text-xl md:text-2xl mb-6 text-gray-600 dark:text-gray-300">
            Frontend Developer & Open Source Contributor
          </Text>

          {/* Key Highlights */}
          <Group justify="center" gap="md" className="mb-8">
            <Badge size="lg" variant="light" color="blue">React 19 & Next.js 15</Badge>
            <Badge size="lg" variant="light" color="green">TypeScript Expert</Badge>
            <Badge size="lg" variant="light" color="violet">AI Pair Programming</Badge>
          </Group>

          {/* Brief Introduction */}
          <Text size="lg" className="mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            오픈소스 생태계에 기여하며 실무와 사이드 프로젝트를 통해 
            지속적으로 성장하는 프론트엔드 개발자입니다.
          </Text>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="text-center">
              <Text size="2xl" fw={700} className="text-blue-600 dark:text-blue-400">200+</Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">GitHub Stars</Text>
            </div>
            <div className="text-center">
              <Text size="2xl" fw={700} className="text-green-600 dark:text-green-400">100K+</Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">NPM Downloads</Text>
            </div>
            <div className="text-center">
              <Text size="2xl" fw={700} className="text-violet-600 dark:text-violet-400">9</Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">Active Projects</Text>
            </div>
            <div className="text-center">
              <Text size="2xl" fw={700} className="text-orange-600 dark:text-orange-400">100%</Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">Test Coverage</Text>
            </div>
          </div>

          {/* CTA Buttons */}
          <Group justify="center" gap="md" className="mb-8">
            <Button
              size="lg"
              leftSection={<IconBrandGithub size={20} />}
              component="a"
              href="https://github.com/Seungwoo321"
              target="_blank"
              variant="filled"
            >
              GitHub
            </Button>
            <Button
              size="lg"
              leftSection={<IconBrandLinkedin size={20} />}
              component="a"
              href="https://linkedin.com/in/seungwoo321"
              target="_blank"
              variant="light"
            >
              LinkedIn
            </Button>
            <Button
              size="lg"
              leftSection={<IconMail size={20} />}
              component="a"
              href="mailto:seungwoo321@gmail.com"
              variant="outline"
            >
              Contact
            </Button>
          </Group>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToProjects}
            className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            <Text size="sm">프로젝트 둘러보기</Text>
            <IconArrowDown size={20} className="animate-bounce" />
          </button>
        </div>
      </Container>
    </section>
  );
}